/* eslint-disable no-console */
import { sortLatestArticles } from "../../middleware/time";

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

			await context.dispatch("getSecretUserArticles", id);

			return article;
		} catch (error) {
			console.log({ vuex_user_article_error: error });
		}
	},
	async get (context, id) {
		try {
			const response = await this.$api.article.getUserArticles(id);
			const article = response.data;

			return article;
		} catch (error) {
			console.log({ vuex_user_article_error: error });
		}
	},
	async getSecret (context, id) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.article.getSecretArticle(
				id,
				token
			);
			const article = response.data;
			return article;
		} catch (error) {
			console.log({ vuex_user_article_error: error });
		}
	},
	async indexUser (context, id) {
		try {
			const response = await this.$api.article.getUserArticles(id);
			const articles = response.data;

			context.commit("setArticles", articles);

			return articles;
		} catch (error) {
			console.log({ vuex_user_article_error: error });
		}
	},
	async indexUserSecrets (context, id) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.article.getSecretUserArticles(
				id,
				token
			);
			const articles = response.data;

			context.commit("setArticles", articles);
			return articles;
		} catch (error) {
			console.log({ vuex_user_article_error: error });
		}
	},
	async patch (context, { id, patch }) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.article.patch(token, id, patch);
			const article = response.data;

			const userId = context.rootGetters["user/getUser"]._id;
			await context.dispatch("getSecretUserArticles", userId);

			return article;
		} catch (error) {
			console.log({ vuex_user_article_error: error });
		}
	},
	async delete (context, id) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.article.delete(token, id);
			const article = response.data;

			const userId = context.rootGetters["user/getUser"]._id;
			await context.dispatch("getSecretUserArticles", userId);

			return article;
		} catch (error) {
			console.log({ vuex_user_article_error: error });
		}
	}
};
