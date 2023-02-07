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
						<small v-if="isLoggedIn">🔐</small>
					</nuxt-link>
				</h1>
			</div>
		</template>

		<v-list nav>
			<v-list-item
				v-for="link in getLinks"
				:key="link.title">
				<base-btn
					:block="true"
					@click="goTo(link.route)">
					{{ link.title }}
				</base-btn>
			</v-list-item>
		</v-list>

		<v-list
			nav
			class="mt-2">
			<v-divider />

			<v-list-item
				v-if="isLoggedIn"
				class="mt-2">
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
			isLoggedIn: "admin/isLoggedIn",
			getLinks: "app/nav/getLinks"
		}),
		showSidebar: {
			get: function() { return this.$store.getters["app/nav/showSidebar"];},
			set: function(value) { return this.$store.commit("app/nav/setSidebar", value);}
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
