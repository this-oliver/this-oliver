/* eslint-disable no-console */
import { sortLatestArticles } from "../../logic/article";

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
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.article.post(token, title, content, tags, publish);
			const article = response.data;

			await context.dispatch("index");

			return article;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Poasting Article", message: error.message }, { root: true });
		}
	},
	async get (context, id) {
		try {
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.article.get(token, id);
			const article = response.data;

			return article;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Getting Article", message: error.message }, { root: true });
		}
	},
	async index (context) {
		try {
			const token = this.$auth.strategy.token.get();
			const response = await this.$api.article.index(token);
			const articles = response.data;

			context.commit("setArticles", articles);

			return articles;
		} catch (error) {
			console.log({ apiError: error });
			context.commit("app/toaster/addError", { title: "Getting Articles", message: error.message }, { root: true });
		}
	},
	async indexTags (context) {
		try {
			const token = this.$auth.strategy.token.get();
			const response = await this.$api.article.indexTags(token);
			const tags = response.data;

			context.commit("setTags", tags);

			return tags;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Getting Tags", message: error.message }, { root: true });
		}
	},
	async indexArticlesByTag (context, tagId) {
		try {
			const token = this.$auth.strategy.token.get();
			const response = await this.$api.article.indexArticlesByTag(token, tagId);
			const articles = response.data;

			return articles;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Getting Articles By Tag", message: error.message }, { root: true });
		}
	},
	async patch (context, { id, patch }) {
		try {
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.article.patch(token, id, patch);
			const article = response.data;

			await context.dispatch("index");

			return article;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Patching Article", message: error.message }, { root: true });
		}
	},
	async delete (context, id) {
		try {
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.article.delete(token, id);
			const article = response.data;

			await context.dispatch("index");

			return article;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Deleting Article", message: error.message }, { root: true });
		}
	}
};
