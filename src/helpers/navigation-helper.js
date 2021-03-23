import i18n from "../i18n";
import ROUTES from "../enums/router-enums";

export let getNavigationItems = () =>{
	return [
		{
			title: `${i18n.t("nav.resume")} 📑 `,
			route: ROUTES.user.resume
		},
	];
};
