<template>
	<v-text-field
		v-model="password"
		:label="reEnter ? 're-enter password' : 'password'"
		:rules="[validate]"
		:success="validate(password)"
		:type="showPassword ? 'text' : 'password'"
		dense
		outlined>
		<template #append>
			<v-btn
				icon
				@click="showPassword = !showPassword">
				<v-icon v-if="showPassword">
					visibility
				</v-icon>
				<v-icon v-else>
					visibility_off
				</v-icon>
			</v-btn>
		</template>
	</v-text-field>
</template>

<script>
import { isValidPasswordLength, isMatching } from "~/utils/validate";

export default {
	props: {
		/**
		 * ask user to re-enter their password
		 */
		reEnter: {
			type: Boolean,
			default: false
		},
		/**
		 * password to compare when re-entering
		 */
		passwordReference: {
			type: String,
			default: null
		},
		required: {
			type: Boolean,
			default: false
		}
	},
	emits: ["input"],
	data() {
		return {
			password: null,
			showPassword: false
		};
	},
	watch: {
		password(password) {
			if(this.validate(password) === true) return this.$emit("input", password);
			else return this.$emit("input", null);
		}
	},
	methods: {
		validate(password) {
			// must match pwd refference and be valid
			if(this.reEnter) { return isMatching(this.passwordReference, password) === true && isValidPasswordLength(password) === true;}
			// must be valid
			if(this.required){ return isValidPasswordLength(password) === true; }
			// must be empty or valid
			else if((password === null || password.length === 0) === true || isValidPasswordLength(password) === true) return true;
			// invalid
			else return false;
		}
	}
};
</script>
