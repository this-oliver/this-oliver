<template>
	<div>
		<nuxt-child />
	</div>
</template>

<script>
	export default {
		layout: "admin",
		middleware: "auth",
		async asyncData ({ $auth }) {
			await $auth.fetchUser();
		}
	};
</script>
