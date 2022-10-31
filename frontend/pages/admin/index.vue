<template>
	<base-page>
		<v-row justify="center">
			<v-col
				cols="11"
				sm="8">
				👀 {{ getUserVisits }}
				<about-me
					:bio="getUserBio"
					:edit-mode="true" />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import AboutMe from "~/components/about/AboutMe.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: { BasePage, AboutMe },
	computed: {
		...mapGetters({
			user: "admin/getUser"
		}),
		getUserBio(){
			return this.user?.bio.short;
		},
		getUserVisits(){
			return this.user?.visits;
		}
	},
	async mounted(){
		await this.$store.dispatch("admin/init");
	}
};
</script>
