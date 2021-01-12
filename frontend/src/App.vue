<template>
	<div :id="theme" class="app">
		<b-navbar :variant="bootstrapTheme" :type="bootstrapTheme">
			<b-navbar-brand>
				Oliver Manzi
			</b-navbar-brand>

			<b-navbar-toggle target="nav" />
			<b-collapse id="nav" is-nav>
				<b-navbar-nav align="end">
					<b-nav-form>
						<b-button @click="toggleTheme">
							<span v-if="darkTheme">
								🌞
							</span>
							<span v-else>
								🌚
							</span>
						</b-button>
					</b-nav-form>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
		<HelloWorld msg="Weeelcome to Your Vue.js App" />
		hey
	</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
	name: "App",
	components: {
		HelloWorld,
	},
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
