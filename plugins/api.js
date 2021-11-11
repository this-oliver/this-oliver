import auth from "../api/auth";
import user from "../api/user";
import article from "../api/article";
import experience from "../api/experience";

const api = (axios) => {
	return {
		auth: auth(axios),
		user: user(axios),
		article: article(axios),
		experience: experience(axios)
	};
};

export default (context, inject) => {
	// inject api into vue components and nuxt context
	inject("api", api(context.$axios));
};
