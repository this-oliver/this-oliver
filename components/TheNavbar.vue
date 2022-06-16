<template>
	<v-app-bar
		id="navigation-bar"
		app
		flat
		:color="showDarkMode ? '#131313' : 'white'">
		<h2>
			<nuxt-link
				class="brand hide-link"
				to="/">
				Oliver Manzi
			</nuxt-link>
		</h2>

		<v-spacer />

		<v-app-bar-nav-icon
			v-if="isScreenMobile"
			class="mr-2 mr-lg-4"
			@click="setSidebar(!showSidebar)" />

		<div v-else>
			<v-btn
				v-for="link in links"
				:key="link.title"
				text
				class="mx-2"
				@click="goTo(link.route)">
				{{ link.title }}
			</v-btn>

			<v-menu
				v-if="loggedIn"
				offset-y
				class="mx-2">
				<template #activator="{ on, attrs }">
					<v-btn
						text
						v-bind="attrs"
						v-on="on">
						🚨 admin
					</v-btn>
				</template>
				<v-list>
					<v-list-item
						v-for="link in adminLinks"
						:key="link.title"
						text
						class="mx-2"
						@click="goTo(link.route)">
						<v-list-item-title>{{ link.title }}</v-list-item-title>
					</v-list-item>
					<v-list-item
						text
						class="mx-2"
						color="error"
						@click="logout">
						<v-list-item-title>
							<b class="red--text">🔐 Logout</b>
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

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
			links: "app/nav/getLinks",
			adminLinks: "app/nav/getAdminLinks",
			showSidebar: "app/nav/showSidebar",
			showDarkMode: "app/theme/isDarkMode"
		}),
		loggedIn () {
			return this.$auth.loggedIn;
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
