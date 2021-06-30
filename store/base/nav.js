export const state = function () {
	return {
		links: [
			{
				title: "articles",
				route: "/articles"
			},
			{
				title: "resume",
				route: "/resume"
			}
		]
	};
};

export const getters = {
	getLinks (state) {
		return state.links;
	}
};
