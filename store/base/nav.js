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
		adminLinks: [
			{
				title: "articles",
				route: "/admin/articles"
			},
			{
				title: "experience",
				route: "/admin/experiences"
			}
		],
		showSidebar: false
	};
};

export const getters = {
	getLinks (state, getters, rootState, rootGetters) {
		const loginStatus = rootGetters["auth/getLoginStatus"];

		// if login status is true, return admin links instead
		return (loginStatus === true) ? state.adminLinks : state.links;
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
