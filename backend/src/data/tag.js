const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const ArticleData = require("../data/article");
const ColorHelper = require("../helpers/color");
const { throwError } = require("../helpers/error");

const TagSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		color: { type: String, unique: true },
	},
	{ timestamps: true }
);

TagSchema.pre('save', function(next){
	this.color = ColorHelper.getRandomColor({ light: true });
	return next();
});

exports.TagModel = Mongoose.model("tag", TagSchema);

exports.createTag = async (name) => {
	try {
		const tag = await this.TagModel.create(new this.TagModel({ name: name }));
		return tag;
	} catch (error) {
		throwError(error, 400);
	}
};

exports.indexTags = async (showSecrets = false) => {
	try {
		let tags;
		if (showSecrets) {
			tags = await this.TagModel.find().exec();
		} else {
			const publicArticles = await ArticleData.indexArticles();
			const publicTags = publicArticles
				.map((article) => article.tags)// get all tags from articles
				// flatten array
				.reduce((acc, val) => acc.concat(val), [])
				// remove duplicates
				.filter((value, index, self) => self.indexOf(value) === index);
			
			tags = publicTags;
		}

		return tags;
	} catch (error) {
		throwError(error, 400);
	}
};

exports.getTag = async (id) => {
	if (!id) {
		throwError("missing id", 400);
	}

	try {
		const tag = await this.TagModel.findById(id).exec();
		return tag;
	} catch (error) {
		throwError(error, 400);
	}
};

exports.deleteTag = async (id) => {
	try {
		let tag = await this.getTag(id);
		tag = await tag.remove();

		return `${tag.title} with id ${id} deleted`;
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.cleanTags = async (dirtyList) => {
	if (!dirtyList) {
		return [];
	}

	try {
		const cleanList = [];
		const allTags = await this.indexTags(true);

		for (let x = 0; x < dirtyList.length; x++) {
			const dirtyTag = dirtyList[x];
			let found = false;

			// check if tag exists
			for (let i = 0; i < allTags.length; i++) {
				const cleanTag = allTags[i];

				if (dirtyTag.name.toLowerCase() == cleanTag.name.toLowerCase()) {
					found = true;
					cleanList.push(cleanTag._id);
					break;
				}
			}

			// if tag is not found, add it to list
			if (!found) {
				const newTag = await this.createTag(dirtyTag.name);
				cleanList.push(newTag._id);
			}
		}

		return cleanList;
	} catch (error) {
		throwError(error.message, error.status);
	}
};
