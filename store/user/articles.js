/* eslint-disable no-console */
import { sortLatestArticles } from "../../utils/time";

export const state = function () {
	return {
		articles: [],
		tags: []
	};
};

export const getters = {
	getArticles (state) {
		return sortLatestArticles([...state.articles]);
	},
	getTags (state) {
		return state.tags;
	}
};

export const mutations = {
	setArticles (state, articles) {
		state.articles = articles;
	},
	setTags (state, tags) {
		state.tags = tags;
	}
};

export const actions = {
	async post (context, { title, content, tags, publish }) {
		try {
			const token = context.rootGetters["auth/getToken"];
			const id = context.rootGetters["user/getUser"]._id;

			const response = await this.$api.article.post(
				token,
				id,
				title,
				content,
				tags,
				publish
			);
			const article = response.data;

			await context.dispatch("indexUserSecrets", id);

			return article;
		} catch (error) {
			context.commit("base/toaster/error", { title: "Poasting Article", message: error.message }, { root: true });
		}
	},
	async get (context, id) {
		try {
			const response = await this.$api.article.get(id);
			const article = response.data;

			return article;
		} catch (error) {
			context.commit(
				"base/toaster/error",
				{ title: "Getting Article", message: error.message },
				{ root: true }
			);
		}
	},
	async getSecret (context, id) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.article.getSecret(
				id,
				token
			);
			const article = response.data;
			return article;
		} catch (error) {
			context.commit(
				"base/toaster/error",
				{ title: "Getting Secret Article", message: error.message },
				{ root: true }
			);
		}
	},
	async indexUser (context, id) {
		try {
			const response = await this.$api.article.indexUser(id);
			const articles = response.data;

			context.commit("setArticles", articles);

			return articles;
		} catch (error) {
			context.commit(
				"base/toaster/error",
				{ title: "Getting User Articles", message: error.message },
				{ root: true }
			);
		}
	},
	async indexUserSecrets (context, id) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.article.indexUserSecrets(
				id,
				token
			);
			const articles = response.data;

			context.commit("setArticles", articles);
			return articles;
		} catch (error) {
			context.commit(
				"base/toaster/error",
				{ title: "Getting User Secret Articles", message: error.message },
				{ root: true }
			);
		}
	},
	async patch (context, { id, patch }) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.article.patch(token, id, patch);
			const article = response.data;

			const userId = context.rootGetters["user/getUser"]._id;
			await context.dispatch("indexUserSecrets", userId);

			return article;
		} catch (error) {
			context.commit(
				"base/toaster/error",
				{ title: "Patching Article", message: error.message },
				{ root: true }
			);
		}
	},
	async delete (context, id) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.article.delete(token, id);
			const article = response.data;

			const userId = context.rootGetters["user/getUser"]._id;
			await context.dispatch("indexUserSecrets", userId);

			return article;
		} catch (error) {
			context.commit(
				"base/toaster/error",
				{ title: "Deleting Article", message: error.message },
				{ root: true }
			);
		}
	}
};
