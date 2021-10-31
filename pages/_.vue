<template>
	<base-page>
		<v-row justify="center">
			<v-col cols="auto">
				<v-chip color="warning">
					🔍 the page you are looking for is not available
				</v-chip>
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
