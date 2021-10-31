<template>
	<base-page>
		<v-row
			justify="center"
			align="center">
			<v-col
				sm="10"
				md="8">
				<regsiter-form />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import RegsiterForm from "~/components/auth/RegisterForm.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: { BasePage, RegsiterForm }
};
</script>
