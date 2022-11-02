<template>
	<v-navigation-drawer
		v-model="showSidebar"
		app
		temporary>
		<template #prepend>
			<div class="pa-2">
				<h1 class="brand">
					<nuxt-link
						class="hide-link"
						to="/">
						Oliver
					</nuxt-link>
				</h1>
			</div>
		</template>

		<v-list nav>
			<v-list-item
				v-for="link in links"
				:key="link.title">
				<base-btn
					:block="true"
					@click="goTo(link.route)">
					{{ link.title }}
				</base-btn>
			</v-list-item>
		</v-list>

		<v-list
			v-if="loggedIn"
			nav>
			<v-divider class="mt-2" />
			<b>🚨 Admin</b>
			<v-list-item
				v-for="link in adminLinks"
				:key="link.title">
				<base-btn
					color="primary"
					:block="true"
					@click="goTo(link.route)">
					{{ link.title }}
				</base-btn>
			</v-list-item>
			<v-divider
				class="mt-2"
				inset />
			<v-list-item class="mt-2">
				<base-btn
					block
					color="error"
					@click="logout">
					Logout
				</base-btn>
			</v-list-item>
		</v-list>

		<template #append>
			<theme-switcher
				class="mt-2 mb-4"
				:list-mode="true" />
		</template>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseBtn from "./base/BaseBtn.vue";
import ThemeSwitcher from "./base/ThemeSwitcher.vue";

export default {
	name: "TheSidebar",
	components: { ThemeSwitcher, BaseBtn },
	computed: {
		...mapGetters({
			links: "app/nav/getLinks",
			adminLinks: "app/nav/getAdminLinks"
		}),
		showSidebar: {
			get: function() { return this.$store.getters["app/nav/showSidebar"];},
			set: function(value) { return this.$store.commit("app/nav/setSidebar", value);}
		},
		loggedIn () {
			return this.$auth.loggedIn;
		}
	},
	methods: {
		...mapMutations({
		}),
		goTo(route) {
			if (this.$route.path !== route) {
				this.$router.push(route);
			}
		},
		async logout () {
			await this.$auth.logout();
			this.$store.commit("app/nav/setSidebar", false);
			this.$router.push("/");
		}
	}
};
</script>
