export const state = function () {
	return {
		links: [
			{
				title: "articles",
				route: "/articles"
			},
			{
				title: "experience",
				route: "/experiences"
			}
		],
		showSidebar: false
	};
};

export const getters = {
	getLinks (state, getters, rootState, rootGetters) {
		const loginStatus = rootGetters["auth/getLoginStatus"];

		if (loginStatus === true) {
			// copy links array and append `/admin/` to links
			return state.links.slice().map((link) => {
				link.route = `/admin${link.route}`;
				return link;
			});
		} else {
			return state.links;
		}
	},
	isSidebarVisible (state) {
		return state.showSidebar;
	}
};

export const mutations = {
	showSidebar (state, show) {
		state.showSidebar = show;
	}
};
