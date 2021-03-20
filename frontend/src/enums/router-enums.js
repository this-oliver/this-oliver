/**
 * Returns router names
 */
const ROUTES = {
	// public
	user:{
		landing: "landing",
		resume: "resume",
	},
	//admin
	admin: {
		profile:"user",
	},
	//other
	auth:{
		login:"login"
	},
	wip: "wip",
};

export default ROUTES;
