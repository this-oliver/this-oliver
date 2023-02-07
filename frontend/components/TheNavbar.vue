<template>
	<v-app-bar
		id="navigation-bar"
		app
		flat
		:color="isDarkMode ? 'black' : 'off-white'"
		rounded="b-lg">
		<h1>
			<nuxt-link
				class="brand hide-link"
				to="/">
				Oliver
				<small v-if="isLoggedIn">🔐</small>
			</nuxt-link>
		</h1>

		<v-spacer />

		<v-app-bar-nav-icon
			v-if="isScreenMobile || isScreenTablet"
			class="mr-2 mr-lg-4"
			@click="setSidebar(!showSidebar)" />

		<div v-else>
			<v-btn
				v-for="link in getLinks"
				:key="link.title"
				text
				class="mx-2"
				@click="goTo(link.route)">
				{{ link.title }}
			</v-btn>

			<v-btn
				v-if="isLoggedIn"
				color="error"
				class="mx-2"
				@click="logout">
				<b>🔐 Logout</b>
			</v-btn>

			<theme-switcher :icon-mode="true" />
		</div>
	</v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ThemeSwitcher from "~/components/base/ThemeSwitcher.vue";
export default {
	name: "TheNavbar",
	components: { ThemeSwitcher },
	computed: {
		...mapGetters({
			isLoggedIn: "admin/isLoggedIn",
			getLinks: "app/nav/getLinks",
			showSidebar: "app/nav/showSidebar"
		})
	},
	methods: {
		...mapMutations({
			setSidebar: "app/nav/setSidebar"
		}),
		async logout () {
			await this.$auth.logout();
			this.goTo("/");
		},
		goTo(path){
			if(this.$route.path !== path) this.$router.push(path);
		}
	}
};
</script>

<style scoped>
#navigation-bar{
  margin: 0 15%;
}

@media screen and (max-width: 480px) {
	/* add styling for mobile phones */
	#navigation-bar {
		margin: 0;
	}
}
</style>
