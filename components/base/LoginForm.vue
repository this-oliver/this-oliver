<template>
	<div>
		<b-form>
			<b-form-group
				class="my-2"
				label="email">
				<b-form-input
					v-model="form.email"
					type="email"
					:state="validateEmail"
					placeholder="enter email" />
			</b-form-group>

			<b-form-group
				class="my-2"
				label="password">
				<b-form-input
					v-model="form.password"
					type="password"
					placeholder="enter password"
					@keyup.enter="login" />
			</b-form-group>

			<b-row align-h="center">
				<b-col
					class="mt-4"
					sm="10"
					md="8">
					<b-button
						block
						variant="outline-primary"
						:disabled="!validateForm || loading"
						@click="login">
						login
						<b-spinner
							v-if="loading"
							small
							type="grow" />
					</b-button>
				</b-col>
			</b-row>
		</b-form>
	</div>
</template>

<script>
	import { isEmail } from "../../utils/validator";
	export default {
		name: "LoginForm",
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
