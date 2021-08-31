<template>
	<div>
		<b-row class="mt-3">
			<b-col cols="12">
				<experience-list :experiences="experiences" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import ExperienceListVue from "~/components/experience/ExperienceList.vue";

	export default {
		components: {
			"experience-list": ExperienceListVue
		},
		head () {
			return {
				title: "Experiences",
				meta: [
					{ charset: "utf-8" },
					{ name: "viewport", content: "width=device-width, initial-scale=1" },
					{ hid: "description", name: "description", content: "Educational and work experience." }
				],
				link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
			};
		},
		computed: {
			...mapGetters({
				experiences: "user/getExperiences"
			})
		}
	};
</script>
