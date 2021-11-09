<template>
	<base-form>
		<input-text
			v-model="form.name"
			label="username" />
		<input-email v-model="form.email" />
		<input-password v-model="form.password" />
		<input-password v-model="form.password2" />

		<!-- actions -->
		<v-row
			v-if="editMode"
			class="mt-2"
			justify="space-between">
			<v-col
				class="mt-1"
				sm="3"
				md="3">
				<v-btn
					block
					color="secondary"
					@click="$router.go(-1)">
					back
				</v-btn>
			</v-col>
			<v-col
				class="mt-1"
				sm="11"
				md="3">
				<v-btn
					block
					color="warning"
					:disabled="!validateForm"
					@click="updateUser({ name: form.name, email: form.email })">
					update
				</v-btn>
			</v-col>
		</v-row>
		<v-row
			v-else
			class="mt-2"
			justify="end">
			<v-col
				v-if="!editMode"
				class="mt-1"
				sm="11"
				md="3">
				<v-btn
					block
					color="primary"
					:disabled="!validateForm"
					@click="
						postUser({
							name: form.name,
							email: form.email,
							password: form.password
						})">
					post
				</v-btn>
			</v-col>
		</v-row>
	</base-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { isEmail } from "../../utils/validate";
import InputText from "../base/InputText.vue";

export default {
	name: "UserForm",
	components: { InputText },
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
			return (this.editMode) ?
				(
					this.validateName !== false &&
					this.validateEmail !== false &&
					this.validatePassword2 !== false
				) :
				(
					this.validateName === true &&
					this.validateEmail === true &&
					this.validatePassword2 === true
				);
		}
	},
	methods: {
		...mapActions({
			postUser: "admin/register",
			updateUser: "admin/patch"
		})
	}
};
</script>
