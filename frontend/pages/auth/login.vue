<template>
	<base-page>
		<v-row
			justify="center"
			align="center">
			<v-col
				sm="10"
				md="6">
				<login-form />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import LoginForm from "~/components/auth/LoginForm.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: { BasePage, LoginForm },
	middleware: "isLoggedIn"
};
</script>
