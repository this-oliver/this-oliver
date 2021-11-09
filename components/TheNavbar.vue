<template>
	<v-app-bar
		app
		flat
		:color="showDarkMode ? 'dark' : 'white'">
		<h2>
			<nuxt-link
				class="brand hide-link"
				to="/">
				Oliver Manzi
			</nuxt-link>
		</h2>

		<v-spacer />

		<div v-if="isScreenDesktop">
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
						👨🏾‍🦱 admin
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
				</v-list>
			</v-menu>

			<theme-switcher :icon-mode="true" />
		</div>

		<v-app-bar-nav-icon
			v-else
			class="mr-2 mr-lg-4"
			@click="setSidebar(!showSidebar)" />
	</v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ThemeSwitcher from "~/components/base/ThemeSwitcher.vue";
export default {
	name: "TheNavbar",
	components: {
		ThemeSwitcher
	},
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
			this.$router.push("/");
		},
		goTo(path){
			if(this.$route.path !== path) this.$router.push(path);
		}
	}
};
</script>
