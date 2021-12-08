<template>
	<div id="html-content">
		<!-- eslint-disable-next-line vue/no-v-html -->
		<span v-html="getHtml" />
	</div>
</template>

<script>
import { SanitizeHtml } from "~/utils/markdown";
export default {
	props: {
		html: {
			type: String,
			required: true
		}
	},
	computed:{
		getHtml(){
			return SanitizeHtml(this.html);
		}
	}
};
</script>

<style scoped>

#html-content, p {
	font-size: 1.25rem;
}
</style>
