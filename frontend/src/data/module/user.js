import { getUser, patchUser } from "../api/user";
import ExperienceModule from "./userExperience.js";

import i18n from "../../i18n";
import { toastError } from "../../mixin";
import TYPES from "../../enums/experience-enums";

import {
	setCache,
	getCache,
	enums as CachEnums
} from "../../helpers/cache-helper";

const user = {
	name: "Olivier Manzi",
	bio: {
		short:
			"Hi, my name is **Oliver** and I'm building this resume so that job recruiters can see how competenet and ambitous I am.\nI like solving problems and learning from my mistakes. I read somewhere that job recruiters love people with core beliefs so here goes: I think sustainability should be at the forefront of everything we should be doing.",
		long:
			"I studied Software Engineering at the University of Gothenburg (2017-2020) where I learnt how to build object oriented sofware like a Java library system (in the terminal), taught a car to parallel park in arduino & c++ , taught another car how to manuver through an intersection filled with other cars and road signs (using object-detection, docker and c++) all while coding with people that would become good friends and collegues. <hr/> Shortly afterwards, the * scary music * Covid-19 pandemic hit the world stage and I decided it was just the right time to feed my curioisty, so I began studying a one-year masters program on Entreprenurship and Innovation Management at the Royal Institue of Technology (or KTH) for short. So far, I'm learning how to coordinate resources to exploit opportunities that bring real value to as many stakeholders as possible... but on a much smaller scale since I can't really meet with all my classmates because of online-learning."
	},
	experiences: [
		{
			title: "software engineering",
			org: "gothenburg university",
			type: TYPES.education,
			startYear: 2017,
			endYear: 2020,
			description:
				"read books, learnt how to code, made some cars parallel park themselves and took part in a shit ton of hackathons"
		},
		{
			title: "entreprenurship and innovation",
			org: "kth",
			type: TYPES.education,
			startYear: 2020,
			endYear: 2021,
			description:
				"pretty much a management course with a sprinkle of entrepreneuship"
		},
		{
			title: "software engineering intern",
			org: "aptiv",
			type: TYPES.job,
			startYear: 2017,
			endYear: 2020,
			description: "did some code stuff on a desk"
		}
	]
};

const namespaced = true;

const state = {
	user: null || user || getCache(CachEnums.USER),
	articles: []
};

const getters = {
	getUser: state => state.user,
	getEducations: state =>
		state.user.experiences.filter(experience => experience.type == TYPES.education),
	getJobs: state =>
		state.user.experiences.filter(experience => experience.type == TYPES.job)
};

const mutations = {
	setUser: (state, user) => {
		state.user = user;
		setCache(CachEnums.USER, user);
	}
};

const actions = {
	initUser: (context, user) => {
		context.commit("setuser", user);
	},
	getUser: async (context) =>{
		try {
			let token = context.rootGetters["auth/getToken"];
			let id = context.getters["user"]._id;
			let response = await getUser(id, token);
			let user = response.data;
			context.commit("setUser", user);
			return response;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.user.title"),
					`${i18n.t("error.api.request.get", { name: "user" })}: ${error.response.data}`
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
			let response = await patchUser(name, email, short, long);
			let user = response.data;
			context.commit("setUser", user);
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.user.title"),
					`${i18n.t("error.api.request.patch", { name: "user" })}: ${error.response.data}`
				);
			} else if (error.request) {
				toastError(i18n.t("error.api.request.noConnection"), error.message);
			} else {
				toastError(i18n.t("error.title"), error);
			}
		}
	},
	resetUser: context => {
		context.commit("setUser", null);
	}
};

const modules = {
	experiences: ExperienceModule
};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions,
	modules
};
