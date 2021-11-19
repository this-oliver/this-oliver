<template>
	<v-app>
		<the-navbar />
		<the-sidebar />
		<the-notification-bar />
		<the-cookie />

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
import TheCookie from "~/components/TheCookie.vue";

export default {
	name: "Visitor",
	components: { TheNavbar, TheFooter, TheSidebar, TheNotificationBar, TheCookie }
};
</script>
