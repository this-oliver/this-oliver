import {
	postArticle,
	patchArticle,
	deleteArticle,
	getSingleArticle,
	getUserArticles,
} from "../api/article";

import i18n from "../../i18n";
import { toastError } from "../../mixin";
import { sortLatestArticles } from "../../helpers/time-helper";

import Router from "../../router";
import ROUTES from "../../enums/router-enums";

const namespaced = true;

const state = {
	articles: [],
	tags: []
};

const getters = {
	getArticles: state => {
		return sortLatestArticles(state.articles);
	},
	getTags: state => state.tags
};

const mutations = {
	setArticles: (state, articles) => {
		state.articles = articles;
	},
	setTags: (state, tags) => {
		state.tags = tags;
	}
};

const actions = {
	postArticle: async (context, { title, content, tags }) => {
		try {
			let token = context.rootGetters["auth/getToken"];
			let userId = context.rootGetters["user/getUser"]._id;

			let response = await postArticle(token, userId, title, content, tags);
			let article = response.data;

			await context.dispatch("getArticles");
			Router.push({ name: ROUTES.admin.profile });

			return article;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.article.title"),
					`${i18n.t("error.api.request.post", { name: "article" })}: ${
						error.response.data
					}`
				);
			} else if (error.request) {
				toastError(i18n.t("error.api.request.noConnection"), error.message);
			} else {
				toastError(i18n.t("error.title"), error);
			}
		}
	},
	getUserArticles: async (context, id) => {
		try {
			let response = await getUserArticles(id);
			let articles = response.data;
			context.commit("setArticles", articles);
			return articles;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.article.title"),
					`${i18n.t("error.api.request.get", { name: "article" })}: ${
						error.response.data
					}`
				);
			} else if (error.request) {
				toastError(i18n.t("error.api.request.noConnection"), error.message);
			} else {
				toastError(i18n.t("error.title"), error);
			}
		}
	},
	getSingleArticle: async (context, id) => {
		try {
			let response = await getSingleArticle(id);
			let article = response.data;
			return article;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.article.title"),
					`${i18n.t("error.api.request.get", { name: "article" })}: ${
						error.response.data
					}`
				);
			} else if (error.request) {
				toastError(i18n.t("error.api.request.noConnection"), error.message);
			} else {
				toastError(i18n.t("error.title"), error);
			}
		}
	},
	patchArticle: async (context, { id, patch }) => {
		try {
			let token = context.rootGetters["auth/getToken"];
			let response = await patchArticle(token, id, patch);
			let article = response.data;

			await context.dispatch("getArticles");
			Router.push({ name: ROUTES.admin.profile });

			return article;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.article.title"),
					`${i18n.t("error.api.request.patch", { name: "article" })}: ${
						error.response.data
					}`
				);
			} else if (error.request) {
				toastError(i18n.t("error.api.request.noConnection"), error.message);
			} else {
				toastError(i18n.t("error.title"), error);
			}
		}
	},
	deleteArticle: async (context, id) => {
		try {
			let token = context.rootGetters["auth/getToken"];
			let response = await deleteArticle(token, id);
			let article = response.data;
			await context.dispatch("getArticles");
			return article;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.article.title"),
					`${i18n.t("error.api.request.delete", { name: "article" })}: ${
						error.response.data
					}`
				);
			} else if (error.request) {
				toastError(i18n.t("error.api.request.noConnection"), error.message);
			} else {
				toastError(i18n.t("error.title"), error);
			}
		}
	}
};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions
};
