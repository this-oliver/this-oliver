<template>
	<base-page>
		<v-row
			justify="center"
			class="mt-sm-3">
			<v-col
				cols="11"
				sm="8">
				<about-me
					:short="getShortBio"
					:long="getLongBio" />
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
			oliver: "user/getUser"
		}),
		getShortBio () {
			return (this.oliver) ? this.oliver.bio.short : "My name is Oliver and I'm a software engineer. I'm studying information security. My interests are coding, entrepreneurship and blockchain technology.";
		},
		getLongBio () {
			return (this.oliver) ? this.oliver.bio.long : "My name is Oliver and I'm a coder with a software engineering background (BSc) that is currently studying information security (Msc) because I think it's interesting. I have worked at large enterprises and small startups.";
		}
	},
	async mounted () {
		// retreive oliver
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
