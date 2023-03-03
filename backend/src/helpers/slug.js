// eslint-disable-next-line no-unused-vars
const { Model } = require("mongoose");
const { throwError } = require("./error");

/**
 * Returns a unique slug
 * 
 * @param {string} name - name to be converted to slug
 * @param {Model} model - model to check if slug is unique
 * @param {string} field - field to check if slug is unique
 * @returns {Promise<string>} slug
 */
exports.createSlug = async function(name, model, field = "slug"){
	if(!name || name.trim().length === 0){
		throwError("slug name is required", 400);
	}

	let slug = name.toLowerCase();
	// remove all non-alphanumeric characters except dashes and spaces
	slug = slug.replace(/[^a-z0-9- ]/g, "");
	// replace all spaces with dashes except for spaces at the beginning and end of the string
	slug = slug.replace(/(^\s+)|(\s+$)/g, "").replace(/\s+/g, "-");

	const slugExists = await model.findOne({ [field]: slug }).exec();

	if(!slugExists){
		return slug;
	} else {
		// append a random number to the slug
		return slug += Math.floor(Math.random() * 1000);
	}
};

/**
 * Returns true if string is slug-like
 * 
 * @param {string} slug - slug to be checked
 * @returns boolean
 */
exports.isSlugLike = function(slug){
	return slug.match(/^[a-z0-9-]+$/);
};
