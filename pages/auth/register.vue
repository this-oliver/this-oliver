<template>
	<b-row align-h="center" align-v="center">
		<b-col sm="10" md="8">
			<regsiter-form />
		</b-col>
	</b-row>
</template>

<script>
	import RegsiterForm from "~/components/base/RegisterForm.vue";

	export default {
		name: "RegisterPage",
		components: { RegsiterForm }
	};
</script>
