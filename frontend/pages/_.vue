<template>
	<base-page>
		<v-row
			justify="center"
			align="center"
			class="text-center">
			<v-col
				cols="auto"
				class="error-text">
				<h2>The page you are looking for is not available</h2>
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import BasePage from "~/components/base/BasePage.vue";
export default {
	name: "Missing",
	components: {
		BasePage
	}
};
</script>
