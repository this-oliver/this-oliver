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
	async get (context, id) {
		try {
			const response = await this.$api.article.get(id);
			const article = response.data;

			return article;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Getting Article", message: error.message }, { root: true });
		}
	},
	async index (context) {
		try {
			const response = await this.$api.article.index();
			const articles = response.data;

			context.commit("setArticles", articles);

			return articles;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Getting User Articles", message: error.message }, { root: true });
		}
	},
	async incrementViews (context, id) {
		try {
			const response = await this.$api.article.incrementViews(id);
			const article = response.data;

			return article;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Patching Article", message: error.message }, { root: true });
		}
	},
	async like (context, id) {
		try {
			const response = await this.$api.article.incrementLikes(id);
			const article = response.data;

			const articleIndex = context.state.articles.findIndex(item => item._id === id);
			context.state.articles[articleIndex] = article;

			return article;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Patching Article", message: error.message }, { root: true });
		}
	}
};
