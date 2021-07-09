<template>
	<div>
		<!-- name -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				class="form-subtitle"
				md="auto">
				username
			</b-col>
			<b-col md="8">
				<b-form-input
					v-model="form.name"
					:state="validateName"
					placeholder="name" />
			</b-col>
		</b-row>
		<!-- email -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				class="form-subtitle"
				md="auto">
				email
			</b-col>
			<b-col md="8">
				<b-form-input
					v-model="form.email"
					:state="validateEmail"
					placeholder="email" />
			</b-col>
		</b-row>
		<!-- password -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				class="form-subtitle"
				md="2">
				password
			</b-col>
			<b-col md="auto">
				<b-form inline>
					<b-form-input
						v-model="form.password"
						class="mr-1"
						type="password"
						:state="validatePassword"
						placeholder="password" />
					<b-form-input
						v-model="form.password2"
						class="mr-1"
						type="password"
						:state="validatePassword2"
						placeholder="re-enter password" />
				</b-form>
			</b-col>
		</b-row>

		<!-- actions -->
		<b-row
			v-if="editMode"
			class="mt-2"
			align-h="between">
			<b-col
				class="mt-1"
				sm="3"
				md="3">
				<b-button
					block
					variant="secondary"
					to="/">
					back
				</b-button>
			</b-col>
			<b-col
				class="mt-1"
				sm="11"
				md="3">
				<b-button
					block
					variant="warning"
					:disabled="!validateForm"
					@click="updateUser({ name: form.name, email: form.email })">
					update
				</b-button>
			</b-col>
		</b-row>
		<b-row
			v-else
			class="mt-2"
			align-h="end">
			<b-col
				v-if="!editMode"
				class="mt-1"
				sm="11"
				md="3">
				<b-button
					block
					variant="primary"
					:disabled="!validateForm"
					@click="
						postUser({
							name: form.name,
							email: form.email,
							password: form.password
						})
					">
					post
				</b-button>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import { isEmail } from "../../utils/validator";

	export default {
		name: "UserForm",
		props: {
			editMode: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				form: {
					name: null,
					email: null,
					password: null,
					password2: null
				}
			};
		},
		computed: {
			...mapGetters({
				user: "user/getUser"
			}),
			validateName () {
				const text = this.form.name;
				if (!text) { return null; }
				return text.length > 0;
			},
			validateEmail () {
				const text = this.form.email;
				if (!text) { return null; }
				return text.length === 0 ? null : isEmail(text);
			},
			validatePassword () {
				const text = this.form.password;
				if (!text) { return null; }
				return text.length > 0;
			},
			validatePassword2 () {
				const text = this.form.password2;
				if (!text) { return null; }
				return text.length > 0 && text === this.form.password;
			},
			validateForm () {
				return (this.editMode)
					? (
						this.validateName !== false &&
						this.validateEmail !== false &&
						this.validatePassword2 !== false
					)
					: (
						this.validateName === true &&
						this.validateEmail === true &&
						this.validatePassword2 === true
					);
			}
		},
		methods: {
			...mapActions({
				postUser: "auth/register",
				updateUser: "user/patch"
			})
		}
	};
</script>
