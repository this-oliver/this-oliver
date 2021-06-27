<template>
	<div>
		<b-sidebar
			id="sidebar-nav"
			:title="getName"
			:bg-variant="getBootstrapTheme"
			:text-variant="getOppositeBootstrapTheme"
			no-header
			shadow>
			<template #default="{ hide }">
				<b-row
					class="ml-2"
					align-v="stretch">
					<!-- title -->
					<b-col
						class="my-3"
						cols="12">
						<nuxt-link
							class="brand"
							to="/name">
							Oliver
						</nuxt-link>
					</b-col>
					<!-- links -->
					<b-col
						v-for="item in getNavItems"
						:key="item.title"
						class="mt-2"
						cols="8">
						<b-link
							class="simple-link"
							:to="item.route">
							{{ item.title }}
						</b-link>
					</b-col>
					<!-- logout -->
					<b-col
						class="mt-2"
						cols="8">
						<b-link
							v-if="inAdminMode"
							class="simple-link"
							@click="logout">
							logout ✌️
						</b-link>
					</b-col>
					<b-col
						class="mt-5"
						cols="12">
						<b-row align-h="around">
							<!-- theme -->
							<b-col
								class="mt-2 mx-1"
								cols="auto">
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
							</b-col>
							<!-- close -->
							<b-col
								class="mt-2 mx-1"
								cols="auto">
								<b-button
									:variant="getBootstrapOutlineTheme"
									@click="hide">
									close
								</b-button>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
			</template>
		</b-sidebar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "TheSidebar",
		computed: {
			...mapGetters({
				getNavItems: "base/nav/getLinks"
			})
		}
	};
</script>
