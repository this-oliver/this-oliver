<template>
	<v-textarea
		v-model="text"
		:label="label"
		:type="sensitive ? 'password' : 'text'"
		:rules="[validate]"
		:success="isValid"
		dense
		outlined />
</template>

<script>
import { isNotEmpty } from "~/utils/validate";

export default {
	props: {
		label: {
			type: String,
			required: true
		},
		required: {
			type: Boolean,
			default: false
		},
		sensitive: {
			type: Boolean,
			default: false
		},
		skipValidate: {
			type: Boolean,
			default: false
		},
		customValidation: {
			type: Function,
			default: null
		}

	},
	emits: ["input"],
	data() {
		return {
			text: null
		};
	},
	computed: {
		isValid(){
			if (this.skipValidate) return null;
			else if (this.required) return this.validate(this.text);
			else return null;

		}
	},
	watch: {
		text(text){
			if(this.validate(text) === true) return this.$emit("input", text);
			else return this.$emit("input", null);
		}
	},
	mounted(){
		if(this.$attrs.value) this.text = this.$attrs.value;
	},
	methods: {
		validate(text) {
			if(this.skipValidate === true){
				return true;
			}

			else if(this.customValidation !== null){
				return this.customValidation(text);
			}

			else {
				// must be valid
				if(this.required){ return isNotEmpty(text) === true; }
				// must be empty or valid
				else if((text === null || text.length === 0) === true || isNotEmpty(text) === true) return true;
				// invalid
				else return false;
			}
		}
	}
};
</script>
