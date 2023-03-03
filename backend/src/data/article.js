// mongo
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const UserData = require("./user");
const TagData = require("./tag");

exports.ArticleModel = Mongoose.model("article", new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: "user" },
		publish: { type: Boolean, default: false },
		views: { type: Number, default: 0 },
		likes: { type: Number, default: 0 },
		dislikes: { type: Number, default: 0 },
		tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
	},
	{ timestamps: true }
));

exports.postArticle = async (userId, title, content, tags, publish) => {
	let user = null;

	// get user
	try {
		user = await UserData.getUser(userId);
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message,
		};
	}

	// handle tag
	let tagList = [];

	try {
		tagList = await TagData.cleanTags(tags);
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message,
		};
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
		throw {
			status: error.status || 400,
			message: error.message || error,
		};
	}
};

exports.indexArticles = async (showSecrets = false) => {
	try {
		if (showSecrets) {
			const articles = await this.ArticleModel.find()
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
			const articles = await this.ArticleModel.find({ publish: true })
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
		throw {
			status: 400,
			message: error.message || error,
		};
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
		throw {
			status: 400,
			message: error.message || error,
		};
	}
};

exports.getArticle = async (id, showSecrets = false) => {
	if (!id) {
		throw {
			status: 400,
			message: "missing id",
		};
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
			throw {
				status: 404,
				message: `article with id ${id} does not exist`,
			};
		}

		return article;
	} catch (error) {
		if (error.kind === "ObjectId") {
			throw {
				status: 404,
				message: `article with id ${id} does not exist`,
			};
		}

		throw {
			status: error.status || 400,
			message: error.message || error,
		};
	}
};

exports.updateArticle = async (id, patch) => {
	let article = null;

	try {
		article = await this.getArticle(id, true);
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message,
		};
	}

	try {
		article.title = patch.title || article.title;
		article.author = patch.author || article.author;
		article.content = patch.content || article.content;

		if (patch.publish !== undefined && patch.publish !== null) {
			article.publish = patch.publish;
		}

		if (patch.tags) {
			article.tags = await TagData.cleanTags(patch.tags);
		}

		article = await article.save();

		return article;
	} catch (error) {
		throw {
			status: 400,
			message: error.message,
		};
	}
};

exports.incrementArticleViews = async (id) => {
	let article = null;

	try {
		article = await this.getArticle(id, true);
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message,
		};
	}

	try {
		article.views = article.views + 1;

		article = await article.save();

		return article;
	} catch (error) {
		throw {
			status: 400,
			message: error.message,
		};
	}
};

exports.incrementArticleLikes = async (id) => {
	let article = null;

	try {
		article = await this.getArticle(id, true);
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message,
		};
	}

	try {
		article.likes = article.likes + 1;

		article = await article.save();

		return article;
	} catch (error) {
		throw {
			status: 400,
			message: error.message,
		};
	}
};

exports.incrementArticleDislikes = async (id) => {
	let article = null;

	try {
		article = await this.getArticle(id, true);
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message,
		};
	}

	try {
		article.dislikes = article.dislikes + 1;

		article = await article.save();

		return article;
	} catch (error) {
		throw {
			status: 400,
			message: error.message,
		};
	}
};

exports.deleteArticle = async (id) => {
	try {
		let xp = await this.getArticle(id, true);
		xp = await xp.remove();

		return `${xp.title} with id ${id} deleted`;
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error,
		};
	}
};
