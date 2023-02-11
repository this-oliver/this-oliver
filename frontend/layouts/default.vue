<template>
	<v-app id="app">
		<the-navbar />
		<the-sidebar />
		<the-notification-bar />

		<v-main class="content">
			<nuxt />
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
	name: "Visitor",
	components: { TheNavbar, TheFooter, TheSidebar, TheNotificationBar }
};
</script>

<style scoped>
.content {
	margin-bottom: 10vh;
}
</style>
