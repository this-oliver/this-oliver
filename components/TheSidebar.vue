<template>
	<b-sidebar
		:visible="isSidebarVisible"
		shadow
		no-header
		:bg-variant="getBootstrapTheme"
		:text-variant="getOppositeBootstrapTheme"
		@hidden="showSidebar(false)">
		<b-row class="ml-2" align-v="stretch">
			<!-- title -->
			<b-col class="my-3" cols="12">
				<nuxt-link class="brand" to="/name">
					Oliver
				</nuxt-link>
			</b-col>
			<!-- links -->
			<b-col v-for="link in links" :key="link.title" class="mt-2" cols="8">
				<b-link class="simple-link" :to="link.route">
					{{ link.title }}
				</b-link>
			</b-col>
		</b-row>
		<template #footer="{ hide }">
			<b-row
				v-if="loggedIn"
				class="mb-3 mx-1"
				align-h="around"
				align-v="center">
				<b-col cols="12">
					<b-dropdown
						text="👨🏾‍🦱 admin"
						block
						dropup
						menu-class="w-100"
						:variant="getBootstrapOutlineTheme">
						<b-dropdown-item
							v-for="link in adminLinks"
							:key="link.title"
							:to="link.route">
							{{ link.title }}
						</b-dropdown-item>
						<b-dropdown-divider />
						<b-dropdown-item>
							<span class="simple-link danger" @click="logout">
								✌️ logout
							</span>
						</b-dropdown-item>
					</b-dropdown>
				</b-col>
			</b-row>
			<b-row class="mb-3 mx-1" align-h="around" align-v="center">
				<!-- close -->
				<b-col cols="8">
					<b-button block :variant="getBootstrapOutlineTheme" @click="hide">
						close
					</b-button>
				</b-col>
				<!-- theme -->
				<b-col cols="auto">
					<b-form-checkbox
						switch
						size="lg"
						:checked="isDarkTheme"
						@change="toggleTheme" />
				</b-col>
			</b-row>
		</template>
	</b-sidebar>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";

	export default {
		name: "TheSidebar",
		computed: {
			...mapGetters({
				links: "base/nav/getLinks",
				adminLinks: "base/nav/getAdminLinks",
				isSidebarVisible: "base/nav/isSidebarVisible"
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
			logout () {
				this.$store.dispatch("authentication/logout");
				this.$router.push("/");
			}
		}
	};
</script>
