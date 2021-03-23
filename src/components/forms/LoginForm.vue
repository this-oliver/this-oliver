<template>
  <div>
    <b-form>
      <b-form-group
        class="input-field"
        :label="`${$t('forms.login.email')}:`">
        <b-form-input
          v-model="form.email"
          type="email"
          :state="validateEmail"
          :placeholder="$t('forms.login.promptEmail')" />
      </b-form-group>

      <b-form-group
        class="input-field"
        :label="`${$t('forms.login.password')}:`">
        <b-form-input
          v-model="form.password"
          type="password"
          :placeholder="$t('forms.login.promptPassword')"
          @keyup.enter="login" />
      </b-form-group>

      <b-row align-h="end">
        <b-col
          class="input-field"
          cols="auto">
          <b-button
            variant="outline-primary"
            :disabled="!validateForm || loading"
            @click="login({email: form.email, password: form.password})">
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
		data: function() {
			return {
				loading: false,
				form: {
					email: null,
					password: null
				}
			};
		},
		computed: {
			validateEmail: function() {
				let email = this.form.email;
				if(!email) return null;
				return email.length == 0 ? null : isEmail(email);
			},
			validateForm: function(){
				return this.validateEmail;
			}
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

