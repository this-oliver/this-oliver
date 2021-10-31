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
				:to="link.route">
				{{ link.title }}
			</v-list-item>
		</v-list>

		<template #append>
			<v-list
				v-if="loggedIn"
				nav
				class="mb-4">
				<v-subheader>👨🏾‍🦱 admin</v-subheader>
				<v-list-item
					v-for="link in adminLinks"
					:key="link.title"
					:to="link.route">
					{{ link.title }}
				</v-list-item>
				<v-btn
					block
					color="error"
					@click="logout">
					logout
				</v-btn>
			</v-list>
		</template>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
	name: "TheSidebar",
	computed: {
			...mapGetters({
				links: "base/nav/getLinks",
				adminLinks: "base/nav/getAdminLinks"
			}),
			showSidebar: {
				get: function() { return this.$store.getters["base/nav/showSidebar"];},
				set: function(value) { return this.$store.commit("base/nav/setSidebar", value);}
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
				this.$store.commit("base/nav/setSidebar", false);
				this.$router.push("/");
			}
	}
};
</script>
