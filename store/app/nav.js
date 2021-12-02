export const state = function () {
	return {
		links: [
			{
				title: "Articles",
				route: "/articles"
			},
			{
				title: "Experience",
				route: "/experiences"
			}
		],
		adminLinks: [
			{
				title: "🔑 About",
				route: "/admin"
			},
			{
				title: "🔑 Articles",
				route: "/admin/articles"
			},
			{
				title: "🔑 Experience",
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
	showSidebar (state) {
		return state.showSidebar;
	}
};

export const mutations = {
	setSidebar (state, show) {
		state.showSidebar = show;
	}
};
