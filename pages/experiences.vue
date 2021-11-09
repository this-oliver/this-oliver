<template>
	<base-page title="experiences">
		<experience-list
			class="mt-2"
			:experiences="experiences" />
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
	head () {
		return {
			title: "Experiences",
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
			experiences: "user/getExperiences"
		})
	}
};
</script>
