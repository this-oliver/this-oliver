import {
	postExperience,
	patchExperience,
	deleteExperience
} from "../api/experience";

import i18n from "../../i18n";
import { toastError } from "../../mixin";

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
			let response = await postExperience(
				title,
				org,
				startYear,
				endYear,
				description,
				type,
				token
			);
			await context.dispatch("user/getUser", null, { root: true });
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
