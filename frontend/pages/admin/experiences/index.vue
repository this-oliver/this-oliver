<template>
	<base-page>
		<template #title>
			<!-- title -->
			<v-row
				justify="space-around"
				align="center">
				<v-col cols="auto">
					<h1>Experiences</h1>
				</v-col>
				<v-col cols="auto">
					<v-btn
						icon
						to="/admin/experiences/create">
						<base-icon icon="add" />
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
import BaseIcon from "~/components/base/BaseIcon.vue";
import BasePage from "~/components/base/BasePage.vue";
import ExperienceList from "~/components/experience/ExperienceList.vue";

export default {
	components: {
		ExperienceList,
		BasePage,
		BaseIcon
	},
	computed: {
		...mapGetters({
			experiences: "admin/experiences/getExperiences"
		})
	}
};
</script>
