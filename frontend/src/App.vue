<template>
	<div :id="theme" class="app">
		<HelloWorld msg="Weeelcome to Your Vue.js App" />
		hey
		<b-button @click="toggleTheme">
			<span v-if="darkTheme">
				🌞
			</span>
			<span v-else>
				🌚
			</span>
		</b-button>
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
	},
	methods: {
		toggleTheme: function() {
			this.darkTheme = !this.darktheme;
		},
	},
};
</script>
