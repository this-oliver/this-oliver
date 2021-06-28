export const state = function () {
	return {
		links: [
			{
				title: "Articles",
				route: "articles"
			},
			{
				title: "Resume",
				route: "resume"
			}
		]
	};
};

export const getters = {
	getLinks (state) {
		return state.links;
	}
};
