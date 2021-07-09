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
			// copy links array
			const links = [...state.links];
			// append `/admin/` to links
			return links.map((link) => {
				const navLink = link;
				navLink.route = `/admin${navLink.route}`;
				return navLink;
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
