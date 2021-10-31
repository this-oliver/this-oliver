<template>
	<v-app>
		<the-navbar />
		<the-sidebar />
		<the-notification-bar />

		<v-main>
			<div class="main-content">
				<nuxt />
			</div>
		</v-main>
		<!-- footer -->
		<the-footer />
	</v-app>
</template>

<script>
import TheNavbar from "~/components/TheNavbar.vue";
import TheSidebar from "~/components/TheSidebar.vue";
import TheFooter from "~/components/TheFooter.vue";
import TheNotificationBar from "~/components/TheNotificationBar.vue";

export default {
	name: "Admin",
	components: { TheNavbar, TheFooter, TheSidebar, TheNotificationBar },
	created(){
		this.$store.commit("app/theme/setDarkMode", true);
		this.$vuetify.theme.dark = this.$store.getters["app/theme/isDarkMode"];
	}
};
</script>
