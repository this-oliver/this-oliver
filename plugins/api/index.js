import auth from "./auth";
import user from "./user";
import article from "./article";
import experience from "./experience";

const api = (axios) => {
	return {
		auth: auth(axios),
		user: user(axios),
		article: article(axios),
		experience: experience(axios)
	};
};

export default (ctx, inject) => {
	// inject api into vue components and nuxt context
	inject("api", api(ctx.$axios));
};
