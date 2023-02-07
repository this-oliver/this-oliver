<template>
	<base-page>
		<experience-form />
	</base-page>
</template>

<script>
import BasePage from "~/components/base/BasePage.vue";
import ExperienceForm from "~/components/experience/ExperienceForm.vue";

export default {
	components: { ExperienceForm, BasePage }
};
</script>
