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

			<b-navbar-toggle target="sidebar-nav" />
			<b-collapse
				id="nav"
				is-nav>
				<b-navbar-nav
					class="ml-auto"
					align="end">
					<!-- links -->
					<b-nav-form
						v-for="item in getNavItems"
						:key="item.title"
						class="mx-2">
						<b-link
							class="simple-link"
							:to="item.route">
							{{ item.title }}
						</b-link>
					</b-nav-form>
					<!-- logout -->
					<b-nav-form class="mx-2">
						<span
							v-if="inAdminMode"
							class="simple-link"
							@click="logout">
							logout ✌️
						</span>
					</b-nav-form>
					<!-- theme -->
					<b-nav-form class="mx-2">
						<b-button
							pill
							:variant="getBootstrapOutlineTheme"
							@click="toggleTheme">
							<span v-if="isDarkTheme">
								☀️
							</span>
							<span v-else>
								🌘
							</span>
						</b-button>
					</b-nav-form>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name: "TheNavbar",
		computed: {
			...mapGetters({
				getNavItems: "base/nav/getLinks"
			})
		}
	};
</script>
