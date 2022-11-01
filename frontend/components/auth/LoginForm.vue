<template>
	<base-form>
		<input-email v-model="form.email" />
		<input-password
			v-model="form.password"
			:required="true"
			@keyup.enter="login" />

		<v-btn
			block
			color="primary"
			:loading="loading"
			:disabled="!validateForm || loading"
			@click="login">
			login
		</v-btn>
	</base-form>
</template>

<script>
import { isEmail } from "../../utils/validate";
import BaseForm from "../base/BaseForm.vue";
import InputEmail from "../base/InputEmail.vue";
import InputPassword from "../base/InputPassword.vue";
export default {
	name: "LoginForm",
	components: {
		BaseForm,
		InputEmail,
		InputPassword
	},
	props: {
		adminMode: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			loading: false,
			form: {
				email: null,
				password: null
			}
		};
	},
	computed: {
		validateEmail () {
			const email = this.form.email;
			if (!email) { return null; }
			return email.length === 0 ? null : isEmail(email);
		},
		validateForm () {
			return this.validateEmail;
		}
	},
	methods: {
		async login () {
			try {
				this.loading = true;
				await this.$auth.loginWith("local", { data: {
					email: this.form.email, password: this.form.password
				} });

				this.$router.push({
					path: "/admin"
				});
				this.loading = false;
			} catch (error) {
				this.loading = false;
			}
		},
		resetForm () {
			this.form = {
				email: null,
				password: null
			};
		}
	}
};
</script>
