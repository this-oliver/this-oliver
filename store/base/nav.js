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
	getLinks (state) {
		return state.links;
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
