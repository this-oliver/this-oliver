<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<span v-html="getHtml" />
	</div>
</template>

<script>
import { SanitizeHtml } from "~/utils/parser";
import Prismjs from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-okaidia.css";

export default {
	props: {
		html: {
			type: String,
			required: true
		},
		sanitize : {
			type: Boolean,
			default: false
		}
	},
	computed:{
		getHtml(){
			return this.sanitize ? SanitizeHtml(this.html) : this.html;
		}
	},
	watch:{
		html(newHtml, oldHtml){
			if(newHtml !== oldHtml){
				Prismjs.highlightAll();
			}
		}
	},
	mounted(){
		Prismjs.highlightAll();
	}
};
</script>

<style lang="css">
.parsed-header-anchor {
  display: none;
}

.parsed-header:hover .parsed-header-anchor {
  display: inline;
}

</style>
