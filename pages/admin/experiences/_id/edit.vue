<template>
	<base-page>
		<experience-form
			v-if="experience"
			:experience="experience"
			:edit-mode="true" />
	</base-page>
</template>

<script>
import BasePage from "~/components/base/BasePage.vue";
import ExperienceForm from "~/components/experience/ExperienceForm.vue";

export default {
	components: { ExperienceForm, BasePage },
	data(){
		return {
			experience: null
		};
	},
	async mounted () {
		const id = this.$route.params.id;
		this.experience = await this.$store.dispatch("admin/experiences/get", id);
	}
};
</script>
