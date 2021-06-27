<template>
	<div>
		<b-row align-h="center">
			<b-col
				v-if="registerMode"
				class="mt-5"
				sm="8"
				md="10">
				<register-form />
			</b-col>
			<b-col
				v-else
				class="mt-5"
				sm="8"
				md="4">
				<login-form />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import LoginFormVue from "../components/forms/LoginForm.vue";
	import RegisterFormVue from "../components/forms/UserForm.vue";
	export default {
		name: "AuthPage",
		components: {
			"login-form": LoginFormVue,
			"register-form": RegisterFormVue
		},
		props: {
			registerMode: {
				type: Boolean,
				default: false
			}
		}
	};
</script>
