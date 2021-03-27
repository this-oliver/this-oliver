import { getSingleUser, getAllUsers, patchUser } from "../api/user";

import ExperienceModule from "./xp";
import ArticleModule from "./article";

import i18n from "../../i18n";
import Router from "../../router";
import { toastError } from "../../mixin";

import ROUTES from "../../enums/router-enums";
import EXPERIENCE from "../../enums/experience-enums";

import Oliver from "../../assets/static/oliver";

import {
	setCache,
	getCache,
	enums as CachEnums
} from "../../helpers/cache-helper";

const namespaced = true;

const state = {
	user: getCache(CachEnums.USER) || Oliver || null,
};

const getters = {
	getUser: state => state.user,
	getXp: state => {
		if(state.user){
			return state.user.experiences;
		}else{
			return [];
		}
	},
	getEducations: state => {
		if(state.user.experiences){
			return state.user.experiences.filter(experience => experience.type == EXPERIENCE.education);
		}else{
			return [];
		}
	},
	getJobs: state => {
		if(state.user.experiences){
			return state.user.experiences.filter(experience => experience.type == EXPERIENCE.job);
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
				context.commit("user/article/setArticles", oliver.articles, {root: true});
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

const modules = {
	xp: ExperienceModule,
	article: ArticleModule
};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions,
	modules
};
