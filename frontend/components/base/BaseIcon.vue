<template>
	<v-icon
		v-if="icon"
		:color="color"
		:small="small"
		:large="large">
		{{ icon }}
	</v-icon>

	<span v-else>
		{{ icon }}
	</span>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: null
		},
		color: {
			type: String,
			default: null
		},
		small: {
			type: Boolean,
			default: false
		},
		large: {
			type: Boolean,
			default: false
		}
	}
};
</script>
