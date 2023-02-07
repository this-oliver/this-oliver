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
		strict : {
			type: Boolean,
			default: true
		}
	},
	computed:{
		getHtml(){
			return this.strict ? SanitizeHtml(this.html) : this.html;
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
