<template>
	<v-text-field
		v-model="email"
		label="email"
		type="email"
		:rules="[validate]"
		:success="validate(email)"
		dense
		outlined />
</template>

<script>
import { isEmail } from "~/utils/validate";

export default {
	props: {
		required: {
			type: Boolean,
			default: true
		},
		value: {
			type: String,
			default: undefined
		}
	},
	emits: ["input"],
	data(){
		return {
			email: null
		};
	},
	watch: {
		email(email){
			if(this.validate(email) === true) return this.$emit("input", email);
			else return this.$emit("input", null);
		}
	},
	mounted(){
		if(this.$attrs.value) this.email = this.$attrs.value;
		else if (this.value) this.email = this.value;
	},
	methods: {
		validate(email) {
			// must be valid
			if(this.required){ return isEmail(email) === true; }
			// must be empty or valid
			else if((email === null || email.length === 0) == true || isEmail(email) === true) return true;
			// invalid
			else return false;
		}
	}
};
</script>
