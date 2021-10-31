<template>
	<div>
		<v-row justify="space-between">
			<v-col
				cols="6"
				class="general-title">
				About Me
				<v-btn
					v-if="editMode"
					class="mx-1"
					pill
					size="sm"
					color="warning"
					to="/admin/edit">
					update
				</v-btn>
			</v-col>
			<v-col
				cols="auto"
				md="auto">
				<v-btn
					class="mx-1"
					color="error"
					:outlined="showShortBio === false"
					@click="toggleBio">
					short
				</v-btn>
				<v-btn
					class="mx-1"
					color="primary"
					:outlined="showShortBio === true"
					@click="toggleBio">
					long
				</v-btn>
			</v-col>
		</v-row>
		<v-row
			class="mt-3"
			justify="center">
			<v-col cols="12">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div
					class="bio-text"
					v-html="getParsedContent" />
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { MarkdownToHtml } from "../../utils/markdown";

export default {
	name: "AboutMe",
	props: {
		short: {
			type: String,
			required: true
		},
		long: {
			type: String,
			required: true
		},
		editMode: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			showShortBio: true
		};
	},
	computed: {
		getParsedContent () {
			if (this.showShortBio) {
				return this.short ? MarkdownToHtml(this.short) : ""; // if short is empty, show empty string
			} else {
				return this.long ? MarkdownToHtml(this.long) : ""; // if long is empty, show empty string
			}
		}
	},
	methods: {
		toggleBio () {
			this.showShortBio = !this.showShortBio;
		}
	}
};
</script>
