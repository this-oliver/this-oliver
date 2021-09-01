<template>
	<b-row align-h="center" align-v="center">
		<b-col sm="10" md="8">
			<regsiter-form />
		</b-col>
	</b-row>
</template>

<script>
	import RegsiterForm from "~/components/auth/RegisterForm.vue";

	export default {
		components: { RegsiterForm }
	};
</script>
