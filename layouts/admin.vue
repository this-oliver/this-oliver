<template>
	<div :id="getTheme" class="admin app-container">
		<!-- navbar -->
		<div>
			<the-navbar />
			<the-sidebar />
			<the-notification-bar />
		</div>
		<!-- content -->
		<b-container>
			<b-row class="app-content" align-h="center">
				<b-col sm="11" md="10">
					<nuxt />
				</b-col>
			</b-row>
		</b-container>
		<!-- footer -->
		<the-footer class="app-footer" />
	</div>
</template>

<script>
	import TheFooter from "../components/TheFooter.vue";
	import TheNavbar from "../components/TheNavbar.vue";
	import TheSidebar from "~/components/TheSidebar.vue";
	import TheNotificationBar from "~/components/TheNotificationBar.vue";

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
