<template>
	<v-list-item v-if="listMode">
		<v-list-item-icon>
			<base-icon
				v-if="showDarkTheme"
				icon="light_mode" />
			<base-icon
				v-else
				icon="dark_mode" />
		</v-list-item-icon>
		<v-spacer />
		<v-list-item-action>
			<v-switch
				v-model="showDarkTheme"
				inset
				color="primary" />
		</v-list-item-action>
	</v-list-item>
	<v-btn
		v-else-if="iconMode"
		icon
		:block="block"
		@click="setDarkTheme(!showDarkTheme)">
		<base-icon
			v-if="showDarkTheme"
			icon="light_mode" />
		<base-icon
			v-else
			icon="dark_mode" />
	</v-btn>
	<v-btn
		v-else
		:block="block"
		:text="!hideText"
		@click="setDarkTheme(!showDarkTheme)">
		<span v-if="!hideText">
			<span v-if="showDarkTheme">light</span>
			<span v-else>dark</span>
      &nbsp;
		</span>
		<base-icon
			v-if="showDarkTheme"
			icon="light_mode" />
		<base-icon
			v-else
			icon="dark_mode" />
	</v-btn>
</template>

<script>
import BaseIcon from "./BaseIcon.vue";
export default {
	components: { BaseIcon },
	props: {
		listMode: {
			type: Boolean,
			default: false
		},
		iconMode: {
			type: Boolean,
			default: false
		},
		block: {
			type: Boolean,
			default: false
		},
		hideText: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		showDarkTheme:  {
			get: function(){ return this.$store.getters["app/theme/isDarkMode"];},
			set: function(value){
				this.$store.commit("app/theme/setDarkMode", value);
				this.$vuetify.theme.dark = value;
			}
		}
	},
	methods: {
		setDarkTheme(value){
			this.$store.commit("app/theme/setDarkMode", value);
			this.$vuetify.theme.dark = value;
		}
	}
};
</script>
