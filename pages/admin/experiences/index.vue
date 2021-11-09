<template>
	<base-page>
		<template #title>
			<!-- title -->
			<v-row
				justify="space-around"
				align="center">
				<v-col cols="auto">
					<h1>experience</h1>
				</v-col>
				<v-col cols="auto">
					<v-btn
						icon
						to="/admin/experiences/create">
						<v-icon>add</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</template>
		<experience-list
			:experiences="experiences"
			:edit-mode="true" />
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import BasePage from "~/components/base/BasePage.vue";
import ExperienceList from "~/components/experience/ExperienceList.vue";

export default {
	components: {
		ExperienceList,
		BasePage
	},
	computed: {
		...mapGetters({
			experiences: "admin/getExperiences"
		})
	}
};
</script>
