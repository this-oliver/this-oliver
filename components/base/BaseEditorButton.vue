<template>
	<v-btn
		small
		elevation="0"
		:text="isText"
		:color="color"
		:disabled="isDisabled"
		:outlined="!hideOutline"
		@click="emitClick">
		<slot />
	</v-btn>
</template>

<script>
export default {
	name: "BaseEditorButton",
	props: {
		color: {
			type: String,
			default: "dark"
		},
		isActive: {
			type: Boolean,
			default: false
		},
		isText: {
			type: Boolean,
			default: false
		},
		isDisabled: {
			type: Boolean,
			default: false
		},
		hideOutline: {
			type: Boolean,
			default: false
		}
	},
	emits: ["click"],
	methods: {
		emitClick(){
			this.$emit("click");
		}
	}
};
</script>
