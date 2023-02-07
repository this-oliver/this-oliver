<template>
	<v-row
		id="editor"
		justify="center">
		<v-col
			cols="12"
			md="6"
			class="content-area">
			<v-textarea
				v-model="markdown"
				:label="label"
				:placeholder="hint"
				:auto-grow="true"
				height="100%"
				outlined />
		</v-col>
		<v-col
			cols="12"
			md="6"
			class="content-area">
			<v-sheet
				width="100%"
				height="100%"
				outlined
				rounded
				class="pa-1 pa-md-2">
				<base-html :html="getHtml" />
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>
import { MarkdownToHtml } from "../../utils/parser";
import BaseHtml from "./BaseHtml.vue";

export default {
	components: { BaseHtml },
	props: {
		value: {
			type: [String, Number],
			default: null
		},
		label: {
			type: String,
			default: null
		},
		hint: {
			type: String,
			default: "Write something..."
		},
		preview: {
			type: Boolean,
			default: false
		}
	},
	emits: ["input"],
	data() {
		return {
			markdown: null
		};
	},
	computed: {
		getHtml(){
			return this.parseToHtml(this.markdown);
		}
	},
	watch: {
		markdown(newContent, oldContent) {
			if(newContent !== oldContent) {
				this.$emit("input", newContent);
			}
		},
		value(newValue, oldValue) {
			if(newValue !== oldValue && newValue !== this.markdown) {
				this.markdown = newValue;
			}
		}
	},
	mounted() {
		this.markdown = this.value;
	},
	methods: {
		parseToHtml(markdown){
			return MarkdownToHtml(markdown, { darkMode: this.isDarkMode });
		}
	}
};
</script>

<style scoped>
.content-area {
	min-height: 5vh;
}
</style>
