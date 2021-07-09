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
				getNavItems: "base/nav/getLinks"
			})
		},
		methods: {
			...mapMutations({
				toggleTheme: "base/ui/toggleTheme",
				showSidebar: "base/nav/showSidebar"
			})
		}
	};
</script>
