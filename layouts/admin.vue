<template>
	<div :id="getTheme" class="admin app-container">
		<!-- navbar -->
		<div>
			<the-navbar />
			<the-sidebar />
			<the-notification-bar />
		</div>
		<!-- content -->
		<b-row class="app-content" align-h="center">
			<b-col sm="11" md="10">
				<nuxt />
			</b-col>
		</b-row>
		<!-- footer -->
		<the-footer class="app-footer" />
	</div>
</template>

<script>
	import TheFooter from "../components/base/TheFooter.vue";
	import TheNavbar from "../components/base/TheNavbar.vue";
	import TheSidebar from "~/components/base/TheSidebar.vue";
	import TheNotificationBar from "~/components/base/TheNotificationBar.vue";

	export default {
		name: "Admin",
		components: { TheNavbar, TheFooter, TheSidebar, TheNotificationBar }
	};
</script>

<style scoped>

.admin {
	border: 5px solid red;
}

</style>
