<template>
	<div>
		<v-row
			v-if="editMode"
			justify="center">
			<v-col
				cols="12"
				md="auto"
				class="text-center">
				<h1>About Me</h1>
			</v-col>
			<v-col
				cols="auto"
				class="text-center ml-sm-auto">
				<base-btn
					class="mx-1"
					color="warning"
					:elevation="0"
					to="/profile/edit">
					update
				</base-btn>
			</v-col>
		</v-row>

		<base-html
			class="mt-3"
			:html="bio" />
	</div>
</template>

<script>
import BaseBtn from "../base/BaseBtn.vue";
import BaseHtml from "../base/BaseHtml.vue";
export default {
	name: "AboutMe",
	components: { BaseHtml, BaseBtn },
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
