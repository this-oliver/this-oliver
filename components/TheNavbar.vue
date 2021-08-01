<template>
	<div>
		<b-navbar
			:variant="getBootstrapTheme"
			:type="getBootstrapTheme"
			toggleable="sm"
			sticky>
			<b-navbar-brand
				class="brand"
				to="/">
				Oliver
			</b-navbar-brand>

			<b-navbar-toggle target="sidebar-nav" @click="showSidebar(true)" />
			<b-collapse
				id="nav"
				is-nav>
				<b-navbar-nav
					class="ml-auto"
					align="end">
					<!-- links -->
					<b-nav-form
						v-for="link in links"
						:key="link.title"
						class="mx-2">
						<b-link
							class="simple-link"
							:to="link.route">
							{{ link.title }}
						</b-link>
					</b-nav-form>
					<!-- admin links -->
					<b-nav-dropdown v-if="loggedIn" class="mx-2" text="👨🏾‍🦱 admin">
						<b-dropdown-item v-for="link in adminLinks" :key="link.title" :to="link.route">
							{{ link.title }}
						</b-dropdown-item>
						<b-dropdown-divider />
						<b-dropdown-item>
							<span
								class="red-text"
								@click="logout">
								✌️ logout
							</span>
						</b-dropdown-item>
					</b-nav-dropdown>
					<!-- theme -->
					<b-nav-form class="mx-2">
						<b-form-checkbox
							switch
							size="lg"
							:checked="isDarkTheme"
							@change="toggleTheme" />
					</b-nav-form>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	export default {
		name: "TheNavbar",
		computed: {
			...mapGetters({
				links: "base/nav/getLinks",
				adminLinks: "base/nav/getAdminLinks"
			}),
			loggedIn () {
				return this.$auth.loggedIn;
			}
		},
		methods: {
			...mapMutations({
				toggleTheme: "base/ui/toggleTheme",
				showSidebar: "base/nav/showSidebar"
			}),
			async logout () {
				await this.$auth.logout();
				this.$router.push("/");
			}
		}
	};
</script>
