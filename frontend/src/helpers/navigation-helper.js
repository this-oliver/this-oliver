import i18n from "../I18n";
import {ROUTES} from "../helpers/router-helper";

export let getNavigationItems = () =>{
	return [
		{
			title: `${i18n.t("nav.about")} 🤠`,
			route: ROUTES.wip //ROUTES.about
		},
		{
			title: `${i18n.t("nav.projects")} 🗃`,
			route: ROUTES.wip //ROUTES.projects
		},
		{
			title: `${i18n.t("nav.journal")} 📝`,
			route: ROUTES.wip //ROUTES.journal
		}
	];
};
