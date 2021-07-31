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
				title: "🔑 articles",
				route: "/admin/articles"
			},
			{
				title: "🔑 experience",
				route: "/admin/experiences"
			}
		],
		showSidebar: false
	};
};

export const getters = {
	getLinks (state) {
		return [...state.links];
	},
	getAdminLinks (state) {
		return [...state.adminLinks];
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
