<template>
	<base-page>
		<v-row
			id="about-me-content"
			justify="center">
			<v-col
				cols="11"
				md="8">
				<about-me :bio="getShortBio" />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";

import AboutMe from "~/components/about/AboutMe.vue";
import BasePage from "~/components/base/BasePage.vue";

import { STORAGE } from "~/logic/enums";
import { getTextDescription } from "~/utils/string";

export default {
	components: {
		BasePage,
		AboutMe
	},
	head () {
		return {
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ hid: "description", name: "description", content: `${getTextDescription(this.getShortBio)}...` }
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
		};
	},
	computed: {
		...mapGetters({
			user: "user/getUser"
		}),
		getShortBio () {
			return (this.user) ? this.user.bio.short : "<h1>👋</h1><p>My name is Oliver. I code stuff. I secure stuff. I’ve spent the last four years studying software engineering and entrepreneurship and building software applications for startups and enterprises.</p> <p>Currently, I'm studying Information Security at LTU and hope to add this skill to my toolbox.</p> <p>In my free time, I like to travel, hang out with friends, listen to music, learn new things and sometimes work on, Fetch, a table ordering web application for bars and restaurants which I have come to see as a nice way for me to apply my studies to real life use-cases.</p>";
		}
	},
	async mounted () {
		// retreive user
		await this.$store.dispatch("user/initUser");

		// check if client has visited website before
		const hasVisited = this.$auth.$storage.getUniversal(STORAGE.visitor);

		// if user has never visited page
		if (!hasVisited) {
			try {
				// increment visit count
				await this.$store.dispatch("user/incrementVisits");
				// place a cookie on user device
				this.$auth.$storage.setUniversal(STORAGE.visitor, STORAGE.visitor);
			} catch (error) {
			}
		}
	}
};
</script>

<style scoped>
#about-me-content {
	margin-top: 10%;
}

@media screen and (max-width: 480px) {
	/* add styling for mobile phones */
	#about-me-content {
		margin-top: 0%;
	}
}
</style>
