// mongo
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const UserData = require("./user");
const TagData = require("./tag");
const SlugHelper = require("../helpers/slug");
const { throwError } = require("../helpers/error");

const ArticleSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: "user" },
		publish: { type: Boolean, default: false },
		views: { type: Number, default: 0 },
		likes: { type: Number, default: 0 },
		dislikes: { type: Number, default: 0 },
		tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
		slug: { type: String, unique: true }
	},
	{ timestamps: true }
);

ArticleSchema.pre('save', function(next) {
	const article = this;

	// Only generate a new slug if the article's title has changed.
	if (!article.isModified('title') && !article.isModified('slug')) {
		return next();
	}

	SlugHelper
		.createSlug(article.title, article.constructor)
		.then(slug => {
		// Check if the generated slug already exists in the database.
			article.constructor.findOne({ slug }, (err, existingArticle) => {
				if (err) {
					return next(err);
				}
	
				if (existingArticle) {
				// If a matching slug already exists, add a random suffix to the slug.
					article.slug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
				} else {
					article.slug = slug;
				}
	
				next();
			});
		}).catch(err => {
			next(err);
		});

});

exports.ArticleModel = Mongoose.model("article", ArticleSchema);

exports.postArticle = async (userId, title, content, tags, publish) => {
	let user = null;

	// get user
	try {
		user = await UserData.getUser(userId);
	} catch (error) {
		throwError(error.message, error.status);
	}

	// handle tag
	let tagList = [];

	try {
		tagList = await TagData.cleanTags(tags);
	} catch (error) {
		throwError(error.message, error.status);
	}

	// create article
	try {
		const article = await this.ArticleModel.create(
			new this.ArticleModel({
				title: title,
				author: user._id,
				content: content,
				tags: tagList,
				publish: publish,
			})
		);

		user.articles.push(article._id);
		await user.save();

		return article;
	} catch (error) {
		throwError(error.message, error.status);
	}
};
/**
 * 
 * @param {boolean} showSecrets - show unpublished articles
 * @returns {Promise<Mongoose.Document[]>} articles
 */
exports.indexArticles = async (showSecrets = false) => {
	try {
		let articles = [];

		if (showSecrets) {
			articles = await this.ArticleModel.find()
				.populate("tags")
				.populate({
					path: "author",
					select: {
						_id: 1,
						name: 1,
						email: 1,
					},
				})
				.exec();
		} else {
			articles = await this.ArticleModel.find({ publish: true })
				.populate("tags")
				.populate({
					path: "author",
					select: {
						_id: 1,
						name: 1,
						email: 1,
					},
				})
				.exec();
		}

		// add slugs to articles that don't have one
		return await Promise.all(
			articles.map(async (article) => {
				if (!article.slug) {
					const slug = await SlugHelper.createSlug(article.title, article.constructor);
					return await this.updateArticle(article._id, { slug });
				}
	
				return article;
			})
		);
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.indexArticlesByTag = async (tagId, showSecrets = false) => {
	try {
		if (showSecrets) {
			const articles = await this.ArticleModel.find(
				{},
				{ tags: { $elemMatch: { _id: { $eq: tagId } } } }
			)
				.populate("tags")
				.populate({
					path: "author",
					select: {
						_id: 1,
						name: 1,
						email: 1,
					},
				})
				.exec();

			return articles;
		} else {
			const articles = await this.ArticleModel.find(
				{ publish: true },
				{ tags: { $elemMatch: { _id: { $eq: tagId } } } }
			)
				.populate("tags")
				.populate({
					path: "author",
					select: {
						_id: 1,
						name: 1,
						email: 1,
					},
				})
				.exec();

			return articles;
		}
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.getArticle = async (id, showSecrets = false) => {
	if (!id) {
		throwError("missing id", 400);
	}

	try {
		let article;

		if (showSecrets) {
			article = await this.ArticleModel.findById(id)
				.populate("tags")
				.populate({
					path: "author",
					select: {
						_id: 1,
						name: 1,
						email: 1,
					},
				})
				.exec();
		} else {
			article = await this.ArticleModel.findOne({ _id: id })
				.where("publish")
				.equals(true)
				.populate("tags")
				.populate({
					path: "author",
					select: {
						_id: 1,
						name: 1,
						email: 1,
					},
				})
				.exec();
		}

		if (!article) {
			throwError(`article with id ${id} does not exist`, 404);
		}

		return article;
	} catch (error) {
		if (error.kind === "ObjectId") {
			throwError(`article with id ${id} does not exist`, 404);
		}

		throwError(error.message, error.status);
	}
};

exports.getArticleBySlug = async (slug, showSecrets = false) => {
	if (!slug) {
		throwError("missing slug", 400);
	}

	try {
		let article;

		if (showSecrets) {
			article = await this.ArticleModel.findOne({ slug })
				.populate("tags")
				.populate({
					path: "author",
					select: {
						_id: 1,
						name: 1,
						email: 1,
					},
				})
				.exec();
		} else {
			article = await this.ArticleModel.findOne({ slug })
				.where("publish")
				.equals(true)
				.populate("tags")
				.populate({
					path: "author",
					select: {
						_id: 1,
						name: 1,
						email: 1,
					},
				})
				.exec();
		}

		if (!article) {
			throwError(`article with slug '${slug}' does not exist`, 404);
		}

		return article;
	} catch (error) {
		if (error.kind === "ObjectId") {
			throwError(`article with slug '${slug}' does not exist`, 404);
		}

		throwError(error.message, error.status);
	}
};

exports.updateArticle = async (id, patch) => {
	let article = null;

	try {
		article = await this.getArticle(id, true);
	} catch (error) {
		throwError(error.message, error.status);
	}

	try {
		article.title = patch.title || article.title;
		article.author = patch.author || article.author;
		article.content = patch.content || article.content;
		article.slug = patch.slug || article.slug;

		if (patch.publish !== undefined && patch.publish !== null) {
			article.publish = patch.publish;
		}

		if (patch.tags) {
			article.tags = await TagData.cleanTags(patch.tags);
		}

		article = await article.save();

		return article;
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.incrementArticleViews = async (id) => {
	let article = null;

	try {
		article = await this.getArticle(id, true);
	} catch (error) {
		throwError(error.message, error.status);
	}

	try {
		article.views = article.views + 1;

		article = await article.save();

		return article;
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.incrementArticleLikes = async (id) => {
	let article = null;

	try {
		article = await this.getArticle(id, true);
	} catch (error) {
		throwError(error.message, error.status);
	}

	try {
		article.likes = article.likes + 1;

		article = await article.save();

		return article;
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.incrementArticleDislikes = async (id) => {
	let article = null;

	try {
		article = await this.getArticle(id, true);
	} catch (error) {
		throwError(error.message, error.status);
	}

	try {
		article.dislikes = article.dislikes + 1;

		article = await article.save();

		return article;
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.deleteArticle = async (id) => {
	try {
		let xp = await this.getArticle(id, true);
		xp = await xp.remove();

		return `${xp.title} with id ${id} deleted`;
	} catch (error) {
		throwError(error.message, error.status);
	}
};
