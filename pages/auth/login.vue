<template>
	<div>
		<login-form />
	</div>
</template>

<script>
	import LoginForm from "~/components/forms/LoginForm.vue";

	export default {
		name: "LoginPage",
		components: { LoginForm }
	};
</script>
