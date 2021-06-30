<template>
	<div :id="getTheme" class="app-container">
		<!-- navbar -->
		<the-navbar />
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

	export default {
		name: "App",
		components: { TheNavbar, TheFooter }
	};
</script>
