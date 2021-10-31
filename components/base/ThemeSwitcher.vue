<template>
	<v-list-item v-if="listMode">
		<v-list-item-icon>
			<v-icon v-if="showDarkTheme">
				dark_mode
			</v-icon>
			<v-icon v-else>
				light_mode
			</v-icon>
		</v-list-item-icon>
		{{ $t("components.sidebar.theme") }}
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
		<v-icon v-if="showDarkTheme">
			dark_mode
		</v-icon>
		<v-icon v-else>
			light_mode
		</v-icon>
	</v-btn>
	<v-btn
		v-else
		:block="block"
		@click="setDarkTheme(!showDarkTheme)">
		<span v-if="!hideText">
			<span v-if="showDarkTheme">{{ $t("components.sidebar.theme-dark") }}</span>
			<span v-else>{{ $t("components.sidebar.theme-light") }}</span>
      &nbsp;
		</span>
		<v-icon v-if="showDarkTheme">
			dark_mode
		</v-icon>
		<v-icon v-else>
			light_mode
		</v-icon>
	</v-btn>
</template>

<script>
export default {
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
			get: function(){ return this.$store.getters["global/theme/isDarkTheme"];},
			set: function(value){
				this.$store.commit("global/theme/setDarkTheme", value);
				this.$vuetify.theme.dark = value;
			}
		}
	},
	methods: {
		setDarkTheme(value){
			this.$store.commit("global/theme/setDarkTheme", value);
			this.$vuetify.theme.dark = value;
		}
	}
};
</script>
