<template>
	<v-app-bar
		id="navigation-bar"
		app
		flat
		rounded="b-lg"
		hide-on-scroll
		:color="getComponentColor"
		:class="`${getTextColor}--text`">
		<h1>
			<nuxt-link
				class="brand hide-link"
				to="/">
				Oliverrr
				<small v-if="isLoggedIn">🔐</small>
			</nuxt-link>
		</h1>

		<v-spacer />

		<v-app-bar-nav-icon
			v-if="isScreenMobile || isScreenTablet"
			class="mr-2 mr-lg-4"
			:color="getComponentColor"
			@click="setSidebar(!showSidebar)">
			<base-icon
				:icon="showSidebar ? 'auto_stories' : 'menu_book'"
				:color="isDarkMode ? 'black' : 'white'" />
		</v-app-bar-nav-icon>

		<div v-else>
			<base-btn
				v-for="link in getLinks"
				:key="link.title"
				text
				:class="`mx-2 ${getTextColor}--text`"
				@click="goTo(link.route)">
				{{ link.title }}
			</base-btn>

			<base-btn
				v-if="isLoggedIn"
				color="error"
				class="mx-2"
				@click="logout">
				<b>🔐 Logout</b>
			</base-btn>

			<theme-switcher
				:icon-mode="true"
				:dark-mode="!isDarkMode" />
		</div>
	</v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ThemeSwitcher from "~/components/base/ThemeSwitcher.vue";
import BaseBtn from "./base/BaseBtn.vue";
import BaseIcon from "./base/BaseIcon.vue";

export default {
	name: "TheNavbar",
	components: { ThemeSwitcher, BaseBtn, BaseIcon },
	computed: {
		...mapGetters({
			isLoggedIn: "admin/isLoggedIn",
			getLinks: "app/nav/getLinks",
			showSidebar: "app/nav/showSidebar"
		}),
		getComponentColor(){
			return this.isDarkMode ? "white" : "black";
		},
		getTextColor(){
			// contrast component color
			return this.isDarkMode ? "black" : "white";
		}
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
