<template>
	<v-text-field
		v-model="text"
		:label="label"
		:hint="hint"
		:persistent-hint="persistantHint"
		:type="type"
		:rules="[validate]"
		:success="isValid"
		:disabled="disabled"
		:dense="dense"
		outlined>
		<template #append>
			<slot name="append" />
		</template>
	</v-text-field>
</template>

<script>
import { isNotEmpty } from "~/utils/validate";

export default {
	props: {
		value: {
			type: [String, Number],
			default: undefined
		},
		label: {
			type: String,
			default: undefined
		},
		hint: {
			type: String,
			default: undefined
		},
		persistantHint: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: "text"
		},
		disabled: {
			type: Boolean,
			default: false
		},
		dense: {
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
		value(value){
			this.text = value;
		},
		text(text){
			if(this.validate(text) === true) return this.$emit("input", text);
			else return this.$emit("input", null);
		}
	},
	created() {
		if(this.$attrs.value) {
			this.text = this.$attrs.value;
		}

		else if (this.value) {
			this.text = this.value;
		};
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
				if(this.required){
					if(this.type === "number"){
						return isNaN(text) === false;
					}else{
						return isNotEmpty(text) === true;
					}
				}
				// must be empty or valid
				else if((text === null || text.length === 0) === true || isNotEmpty(text) === true || (this.type === "number" && isNaN(text) === false)) return true;
				// invalid
				else return false;
			}
		}
	}
};
</script>
