import i18n from "../i18n";

/**
 * handles user locale
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
export function handleLocale(to, from, next) {
	let language = to.params.locale;

	if (!language) language = process.env.VUE_APP_i18n_FALLBACK_LOCALE;

	// checks if lang param is valid
	let validLocaleFlag = false;
	i18n.availableLocales.forEach(locale => {
		if (locale == language) {
			validLocaleFlag = true;
			return;
		}
	});

	//if lang param is invalid, set it to locale and continue routing
	if (!validLocaleFlag) {
		let params = to.params;
		params.locale = process.env.VUE_APP_i18n_LOCALE || i18n.locale;
		return next({ name: to.name, params: params });
	} else {
		i18n.locale = language;
		return next({ params: { locale: i18n.locale } });
	}
}
