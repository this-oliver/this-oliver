<template>
	<b-row align-h="center" align-v="center">
		<b-col sm="10" md="6">
			<login-form />
		</b-col>
	</b-row>
</template>

<script>
	import LoginForm from "~/components/base/LoginForm.vue";

	export default {
		name: "LoginPage",
		components: { LoginForm },
		middleware: "isLoggedIn"
	};
</script>
