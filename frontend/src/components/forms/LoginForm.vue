<template>
  <div>
    <b-form>
      <b-form-group
        class="input-field"
        :label="`${$t('authPage.loginForm.email')}:`">
        <b-form-input
          v-model="form.email"
          type="email"
          :state="this.email" />
      </b-form-group>

      <b-form-group
        class="input-field"
        :label="`${$t('authPage.loginForm.password')}:`">
        <b-form-input
          v-model="form.password"
          type="password"
          @keyup.enter="login" />
      </b-form-group>

      <b-row align-h="end">
        <b-col
          class="input-field"
          cols="auto">
          <b-button
            variant="outline-primary"
            :disabled="!this.email || loading"
            @click="login(email, password)">
            {{ $t("form.actions.login") }}
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
	import {mapActions} from "vuex";
	import {isEmail} from "../../helpers/validator-helper";
	export default {
		name: "LoginForm",
		props:{
			adminMode:{
				type: Boolean,
				default: false
			}
		},
		computed: {
			email: function() {
				let email = this.form.email;
				return email.length == 0 ? null : isEmail(email);
			},
		},
		data: function() {
			return {
				loading: false,
				form: {
					email: "",
					password: ""
				}
			};
		},
		methods: {
			...mapActions({
				login: "auth/login"
			}),
			resetForm: function() {
				this.form = {
					name: "",
					email: "",
					password: ""
				};
			}
		}
	};
</script>

