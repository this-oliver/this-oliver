<template>
	<v-navigation-drawer
		v-model="showSidebar"
		app
		temporary>
		<template #prepend>
			<div class="pa-2">
				<h2 class="brand">
					<nuxt-link
						class="hide-link"
						to="/">
						Oliver Manzi
					</nuxt-link>
				</h2>
			</div>
		</template>

		<v-list nav>
			<v-list-item
				v-for="link in links"
				:key="link.title"
				exact
				:to="link.route">
				{{ link.title }}
			</v-list-item>
		</v-list>

		<v-divider v-if="loggedIn" />

		<v-list
			v-if="loggedIn"
			class="mt-2"
			nav>
			<v-subheader>👨🏾‍🦱 admin</v-subheader>
			<v-list-item
				v-for="link in adminLinks"
				:key="link.title"
				exact
				:to="link.route">
				{{ link.title }}
			</v-list-item>
			<v-list-item>
				<v-btn
					block
					color="error"
					@click="logout">
					logout
				</v-btn>
			</v-list-item>
		</v-list>

		<v-divider />
		<theme-switcher
			class="mt-2 mb-4"
			:list-mode="true" />

		<template #append>
			<theme-switcher
				class="mt-2 mb-4"
				:list-mode="true" />
		</template>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ThemeSwitcher from "./base/ThemeSwitcher.vue";

export default {
	name: "TheSidebar",
	components: { ThemeSwitcher },
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
			async logout () {
				await this.$auth.logout();
				this.$store.commit("app/nav/setSidebar", false);
				this.$router.push("/");
			}
	}
};
</script>
