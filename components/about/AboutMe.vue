<template>
	<div>
		<v-row justify="center">
			<v-col
				v-if="editMode"
				cols="12"
				md="auto"
				class="text-center">
				<h1>About Me</h1>
			</v-col>
			<v-col
				v-if="editMode"
				cols="auto"
				class="text-center ml-sm-auto">
				<v-btn
					class="mx-1"
					elevation="0"
					color="warning"
					to="/admin/edit">
					update
				</v-btn>
			</v-col>
		</v-row>

		<base-html
			class="mt-3"
			:html="bio" />
	</div>
</template>

<script>
import BaseHtml from "../base/BaseHtml.vue";
export default {
	name: "AboutMe",
	components: { BaseHtml },
	props: {
		bio: {
			type: String,
			required: true
		},
		editMode: {
			type: Boolean,
			default: false
		}
	}
};
</script>
