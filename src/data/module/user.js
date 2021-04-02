import { getSingleUser, getAllUsers, patchUser } from "../api/user";

import ExperienceModule from "./xp";
import ArticleModule from "./article";

import i18n from "../../i18n";
import Router from "../../router";
import { toastError } from "../../mixin";
import { sortLatestXp } from "../../helpers/time-helper";
import {
	setCache,
	getCache,
	enums as CachEnums
} from "../../helpers/cache-helper";

import Oliver from "../../assets/static/oliver";
import ROUTES from "../../enums/router-enums";

const namespaced = true;

const modules = {
	xp: ExperienceModule,
	article: ArticleModule
};

const state = {
	user: getCache(CachEnums.USER) || Oliver || null,
};

const getters = {
	getUser: state => state.user,
	getXp: state => {
		if(state.user){
			return sortLatestXp(state.user.experiences);
		}else{
			return [];
		}
	}
};

const mutations = {
	setUser: (state, user) => {
		state.user = user;
		setCache(CachEnums.USER, user);
	}
};

const actions = {
	initUser: async context => {
		try {
			let response = await getAllUsers();
			let users = response.data;

			if (users.length > 0) {
				let oliver = users[0];

				context.commit("setUser", oliver);
				await context.dispatch("user/article/getUserArticles", oliver._id, {
					root: true
				});
			}

			return users[0];
		} catch (error) {
			context.commit("setUser", Oliver);

			if (error.response) {
				toastError(
					i18n.t("error.user.title"),
					`${i18n.t("error.api.request.get", { name: "user" })}: ${
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
	initAdmin: async context => {
		try {
			let userId = context.rootGetters["auth/getDecodedToken"];
			let response = await getSingleUser(userId);
			let oliver = response.data;

			context.commit("setUser", oliver);
			await context.dispatch("user/article/getSecretUserArticles", oliver._id, {
				root: true
			});

			return oliver;
		} catch (error) {
			context.commit("setUser", Oliver);

			if (error.response) {
				toastError(
					i18n.t("error.user.title"),
					`${i18n.t("error.api.request.get", { name: "user" })}: ${
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
	getUser: async context => {
		try {
			let id = context.state.user._id;
			let response = await getSingleUser(id);
			let user = response.data;
			context.commit("setUser", user);
			return user;
		} catch (error) {
			context.commit("setUser", Oliver);

			if (error.response) {
				toastError(
					i18n.t("error.user.title"),
					`${i18n.t("error.api.request.get", { name: "user" })}: ${
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
	patchUser: async (context, { name, email, short, long }) => {
		try {
			let token = context.rootGetters["auth/getToken"];
			let id = context.state.user._id;
			let response = await patchUser(id, name, email, short, long, token);
			let user = response.data;
			context.commit("setUser", user);

			Router.push({ name: ROUTES.admin.profile });
			return user;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.user.title"),
					`${i18n.t("error.api.request.patch", { name: "user" })}: ${
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
	reset: context => {
		context.commit("setUser", null);
	}
};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions,
	modules
};
