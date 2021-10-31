<template>
	<v-select
		v-model="selected"
		:items="items"
		:label="label"
		:hint="hint"
		:dense="dense"
		outlined />
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: undefined
		},
		items: {
			type: Array,
			required: true
		},
		itemValue: {
			type: String,
			default: undefined
		},
		itemText: {
			type: String,
			default: undefined
		},
		icons: {
			type: Boolean,
			default: false
		},
		hint: {
			type: String,
			default: undefined
		},
		dense: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		customValidation: {
			type: Function,
			default: null
		},
		skipValidate: {
			type: Boolean,
			default: false
		}
	},
	emits: ["input"],
	data() {
		return {
			selected: null
		};
	},
	watch: {
		selected(selected){
			if(this.validate(selected) === true) return this.$emit("input", selected);
			else return this.$emit("input", null);
		}
	},
	mounted(){
		if(this.$attrs.value){
			if(isNaN(this.$attrs.value)){
				this.selected = this.$attrs.value;
			}else {
				this.selected = Number(this.$attrs.value);
			}
		}
	},
	methods: {
		validate(value) {
			if(this.skipValidate === true){
				return true;
			}

			else if(this.customValidation !== null){
				return this.customValidation(value);
			}
			
			else {
				// must be valid
				if(this.required){ return true; }
				//! [TODO add validation?] must be empty or valid
				else if(value === null || true) return true;
				// invalid
				else return false;
			}
		}
	}
};
</script>
