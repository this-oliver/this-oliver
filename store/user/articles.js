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
	async get (context, id) {
		try {
			const response = await this.$api.article.get(id);
			const article = response.data;

			return article;
		} catch (error) {
			context.commit("base/toaster/addError", { title: "Getting Article", message: error.message }, { root: true });
		}
	},
	async indexUser (context, id) {
		try {
			const response = await this.$api.article.indexUser(id);
			const articles = response.data;

			context.commit("setArticles", articles);

			return articles;
		} catch (error) {
			context.commit("base/toaster/addError", { title: "Getting User Articles", message: error.message }, { root: true });
		}
	}
};
