<template>
	<v-btn
		:block="block"
		:class="getBtnClass"
		:color="color"
		:dark="isBtnDark"
		:depressed="depressed"
		:disabled="disabled"
		:elevation="elevation"
		:icon="icon"
		:large="large"
		:light="!isBtnDark"
		:outlined="outline"
		:rounded="rounded"
		:text="text"
		:tile="isTile"
		:to="to"
		:small="small"
		@click="emitClick">
		<slot />
	</v-btn>
</template>

<script>

export default {
	props: {
		block: {
			type: Boolean,
			default: false
		},
		btnClass: {
			type: String,
			default: ""
		},
		color: {
			type: String,
			default: null
		},
		dark: {
			type: Boolean,
			default: false
		},
		depressed: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		elevation: {
			type: Number,
			default: 0
		},
		icon: {
			type: Boolean,
			default: false
		},
		large: {
			type: Boolean,
			default: false
		},
		light: {
			type: Boolean,
			default: false
		},
		outline: {
			type: Boolean,
			default: false
		},
		rounded: {
			type: Boolean,
			default: false
		},
		text: {
			type: Boolean,
			default: false
		},
		tile: {
			type: Boolean,
			default: true
		},
		to: {
			type: String,
			default: null
		},
		small: {
			type: Boolean,
			default: false
		}
	},
	emits: ["click"],
	computed:{
		getBtnClass(){
			return this.btnClass;
		},
		isBtnDark(){
			return this.light ? false : true;
		},
		isTile(){
			return this.rounded ? false : this.tile;
		}
	},
	methods: {
		emitClick () {
			this.$emit("click");
		}
	}
};
</script>
