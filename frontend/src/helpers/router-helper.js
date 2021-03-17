import I18n from "../I18n";

/**
 * Returns router names
 */
export const ROUTES = {
	// public
	user:{
		landing: "landing",
		resume: "resume",
	},
	//admin
	admin: {
		profile:"user",
	},
	//other
	wip: "wip",
};

/**
 * handles user locale
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
export const handleLocale = function(to, from, next) {
	let language = to.params.locale;

	if (!language) language = process.env.VUE_APP_I18n_FALLBACK_LOCALE;

	// checks if lang param is valid
	let validLocaleFlag = false;
	I18n.availableLocales.forEach(locale => {
		if (locale == language) {
			validLocaleFlag = true;
			return;
		}
	});

	//if lang param is invalid, set it to locale and continue routing
	if (!validLocaleFlag) {
		let params = to.params;
		params.locale = process.env.VUE_APP_I18n_LOCALE || I18n.locale;
		return next({ name: to.name, params: params });
	} else {
		I18n.locale = language;
		return next({ params: { locale: I18n.locale } });
	}
};
