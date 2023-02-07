export const state = function () {
	return {
		links: [
			{
				title: "Articles",
				route: "/articles"
			},
			{
				title: "Experiences",
				route: "/experiences"
			}
		],
		showSidebar: false
	};
};

export const getters = {
	getLinks (state) {
		return [...state.links];
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
