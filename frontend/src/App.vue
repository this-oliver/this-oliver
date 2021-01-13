<template>
	<div :id="`app ${theme}`">
		<b-navbar :variant="bootstrapTheme" :type="bootstrapTheme" toggleable="sm">
			<b-navbar-brand>
				Oliver Manzi
			</b-navbar-brand>

			<b-navbar-toggle target="nav" />
			<b-collapse id="nav" is-nav>
				<b-navbar-nav class="ml-auto" align="end">
					<b-navbar-brand @click="toggleTheme">
						<span v-if="darkTheme">
							🌞
						</span>
						<span v-else>
							🌚
						</span>
					</b-navbar-brand>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>

		<b-container fluid>
			<b-row id="content" align-h="center" align-v="stretch">
				<b-col cols="12">
					<router-view></router-view>
				</b-col>
			</b-row>

			<b-row id="foot">
				<b-col cols="auto">
					Github
				</b-col>
				<b-col cols="auto">
					Linked
				</b-col>
				<b-col cols="auto">
					FetchQr
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
export default {
	name: "App",
	data: function() {
		return {
			darkTheme: false,
		};
	},
	computed: {
		theme: function() {
			return this.darkTheme ? "dark-theme" : "light-theme";
		},
		bootstrapTheme: function() {
			return this.darkTheme ? "dark" : "light";
		},
	},
	methods: {
		toggleTheme: function() {
			this.darkTheme = !this.darkTheme;
		},
	},
};
</script>
