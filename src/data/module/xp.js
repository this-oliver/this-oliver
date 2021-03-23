import {
	postExperience,
	patchExperience,
	deleteExperience
} from "../api/experience";

import i18n from "../../i18n";
import Router from "../../router";
import { toastError } from "../../mixin";

import ROUTES from "../../enums/router-enums";

const namespaced = true;
const state = {};
const getters = {};
const mutations = {};

const actions = {
	postExperience: async (
		context,
		{ title, org, startYear, endYear, description, type }
	) => {
		try {
			let token = context.rootGetters["auth/getToken"];
			let userId = context.rootGetters["user/getUser"]._id;
			let response = await postExperience(
				userId,
				title,
				org,
				startYear,
				endYear,
				description,
				type,
				token
			);
			
			await context.dispatch("user/getUser", null, { root: true });
			Router.push({ name: ROUTES.admin.profile});

			return response;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.experience.title"),
					`${i18n.t("error.api.request.post", { name: "experience" })}: ${
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
	patchExperience: async (
		context,
		{ id, title, org, startYear, endYear, description, type }
	) => {
		try {
			let token = context.rootGetters["auth/getToken"];
			let response = await patchExperience(
				id,
				title,
				org,
				startYear,
				endYear,
				description,
				type,
				token
			);

			await context.dispatch("user/getUser", null, { root: true });
			Router.push({ name: ROUTES.admin.profile });

			return response;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.experience.title"),
					`${i18n.t("error.api.request.patch", { name: "experience" })}: ${
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
	deleteExperience: async (context, id) => {
		try {
			let token = context.rootGetters["auth/getToken"];
			let response = await deleteExperience(id, token);
			
			await context.dispatch("user/getUser", null, {root: true});
			Router.push({ name: ROUTES.admin.profile });

			return response;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.experience.title"),
					`${i18n.t("error.api.request.delete", { name: "experience" })}: ${
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
