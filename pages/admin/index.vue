<template>
	<base-page>
		<v-row justify="center">
			<v-col
				cols="11"
				sm="8">
				👀 {{ user.visits }}
				<about-me
					:short="user.bio.short"
					:long="user.bio.long"
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
		})
	},
	async mounted(){
		await this.$auth.fetchUser();
	}
};
</script>
