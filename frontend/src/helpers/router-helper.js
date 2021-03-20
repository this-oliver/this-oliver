import I18n from "../I18n";
//import Store from "../data/store";

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
	auth:{
		login:"login"
	},
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

/**
 * checks whether user is authorized
 * @param {*} to 
 * @param {*} from 
 * @param {*} next 
 */
export const checkAuthorized = async function(/*to, from, next*/) {
	/* if client is going to business side, make sure 
	they have business access priveleges or higher and 
	the same for admin side*/

	//let matched = to.matched;
	//let adminMode = false;

	//let WildCard = {
	//	name: ROUTES.wip,
	//};
	//let LoginPage = {
	//	name: ROUTES.auth.login,
	//};

	//for(let i = 0; i < matched.length; i++){
	//	let route = matched[i];
		
	//	if (route.components.default.name === "UserPage") {
	//		adminMode = true;
	//		break;
	//	}
	//}
	
	//try {
	//	let hasAccess = Store.getters["auth/getLoginStatus"];
	//	let authenticated = await Store.dispatch("auth/authenticate");
		
	//	if (adminMode === true) {
	//		if (authenticated === true && hasAccess === true) {
	//			return next();
	//		} else {
	//			await Store.dispatch("auth/logout");
	//			return next(LoginPage);
	//		}
	//	}

	//	return next(WildCard);
	//} catch (error) {
	//	next(WildCard);
	//}
};
