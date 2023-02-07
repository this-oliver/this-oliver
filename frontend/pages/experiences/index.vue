<template>
	<base-page title="experiences">
		<experience-list
			:experiences="experiences"
			:edit-mode="isLoggedIn" />
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import BasePage from "~/components/base/BasePage.vue";
import ExperienceList from "~/components/experience/ExperienceList.vue";

export default {
	components: {
		BasePage,
		ExperienceList
	},
	async asyncData({ store }) {
		const initQuery = store.getters["admin/isLoggedIn"] ? "admin/init" : "user/init";
		await store.dispatch(initQuery);
		return;
	},
	head () {
		return {
			title: "Experiences - Oliver's Personal Website",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ hid: "description", name: "description", content: "Educational and work experience." }
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
		};
	},
	computed: {
		...mapGetters({
			isLoggedIn: "admin/isLoggedIn"
		}),
		experiences(){
			const indexQuery = this.$store.getters["admin/isLoggedIn"] ? "admin/experiences/getExperiences" : "user/getExperiences";
			return this.$store.getters[indexQuery];
		}
	}
};
</script>
