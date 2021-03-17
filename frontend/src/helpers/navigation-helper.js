import i18n from "../I18n";
import {ROUTES} from "../helpers/router-helper";

export let getNavigationItems = () =>{
	return [
		{
			title: `${i18n.t("nav.resume")} 📑 `,
			route: ROUTES.user.resume
		},
	];
};
