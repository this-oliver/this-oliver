<template>
  <div>
    <!-- name -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="sub-header"
        md="auto">
        {{ $t("forms.user.name") }}
      </b-col>
      <b-col md="8">
        <b-form-input
          v-model="form.name"
          :state="validateName"
          :placeholder="$t('forms.user.promptName')" />
      </b-col>
    </b-row>
    <!-- email -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="sub-header"
        md="auto">
        {{ $t("forms.user.email") }}
      </b-col>
      <b-col md="8">
        <b-form-input
          v-model="form.email"
          :state="validateEmail"
          :placeholder="$t('forms.user.promptEmail')" />
      </b-col>
    </b-row>
    <!-- password -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="sub-header"
        md="2">
        {{ $t("forms.user.password") }}
      </b-col>
      <b-col md="auto">
        <b-form inline>
          <b-form-input
            class="mr-1"
            v-model="form.password"
            type="password"
            :state="validatePassword"
            :placeholder="$t('forms.user.promptPassword')" />
          <b-form-input
            class="mr-1"
            v-model="form.password2"
            type="password"
            :state="validatePassword2"
            :placeholder="$t('forms.user.promptPassword2')" />
        </b-form>
      </b-col>
    </b-row>

    <!-- actions -->
    <b-row
      class="mt-2"
      v-if="editMode"
      align-h="between">
      <b-col
        class="mt-1"
        sm="3"
        md="3">
        <b-button
          block
          variant="secondary"
          :to="{ name: ROUTES.admin.profile }">
          {{ $t("form.actions.back") }}
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
          {{ $t("form.actions.update") }}
        </b-button>
      </b-col>
    </b-row>
    <b-row
      class="mt-2"
      v-else
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
          {{ $t("form.actions.post") }}
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import { isEmail } from "../../helpers/validator-helper";

	export default {
		name: "UserForm",
		props: {
			editMode: {
				type: Boolean,
				default: false
			}
		},
		data: function() {
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
			validateName: function() {
				let text = this.form.name;
				if (!text) return null;
				return text.length > 0;
			},
			validateEmail: function() {
				let text = this.form.email;
				if (!text) return null;
				return text.length == 0 ? null : isEmail(text);
			},
			validatePassword: function() {
				let text = this.form.password;
				if (!text) return null;
				return text.length > 0;
			},
			validatePassword2: function() {
				let text = this.form.password2;
				if (!text) return null;
				return text.length > 0 && text == this.form.password;
			},
			validateForm: function() {
				return (this.editMode)? (
					this.validateName != false &&
					this.validateEmail != false &&
					this.validatePassword2 != false
				) : (
					this.validateName == true &&
					this.validateEmail == true &&
					this.validatePassword2 == true
				);
			}
		},
		methods: {
			...mapActions({
				postUser: "auth/register",
				updateUser: "user/patchUser"
			})
		}
	};
</script>
