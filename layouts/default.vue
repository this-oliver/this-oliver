<template>
	<div :id="getTheme" class="app-container">
		<!-- navbar -->
		<div>
			<the-navbar />
			<the-sidebar />
			<the-notification-bar />
		</div>
		<!-- content -->
		<b-container>
			<b-row class="app-content" align-h="center">
				<b-col cols="11">
					<nuxt />
				</b-col>
			</b-row>
		</b-container>
		<!-- footer -->
		<the-footer class="app-footer" />
	</div>
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
