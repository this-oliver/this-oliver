<template>
	<v-btn
		small
		text
		outlined
		:disabled="disabled"
		@click="emitClick">
		<slot />
	</v-btn>
</template>

<script>
export default {
	name: "BaseEditorButton",
	props: {
		isActive: {
			type: Boolean,
			default: false
		},
		disabled: {
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
