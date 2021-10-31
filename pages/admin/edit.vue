<template>
	<base-page>
		<about-form :edit-mode="true" />
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import AboutForm from "~/components/about/AboutForm.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: { AboutForm, BasePage },
	computed: {
		...mapGetters({
			user: "admin/getUser"
		})
	},
	async mounted () {
		await this.$store.dispatch("admin/initUser");
	}
};
</script>
