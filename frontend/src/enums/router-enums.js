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
		profile:"admin-user",
		bio:"admin-bio",
		experiences:"admin-experiences",
		experienceCreate:"admin-experience-create",
		experienceUpdate:"admin-experience-update",
	},
	//other
	auth:{
		login:"login"
	},
	wip: "wip",
};

export default ROUTES;
