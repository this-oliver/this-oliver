<template>
	<div :id="getTheme" class="app-container">
		<!-- navbar -->
		<div>
			<the-navbar />
			<the-sidebar />
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

	export default {
		name: "App",
		components: { TheNavbar, TheFooter, TheSidebar },
		async fetch () {
			await this.$store.dispatch("user/initUser");
		}
	};
</script>
