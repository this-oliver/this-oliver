<template>
	<div>
		<b-row align-h="between">
			<b-col md="auto" class="general-title mx-2">
				About Me
				<b-button
					v-if="editMode"
					class="mx-1"
					pill
					size="sm"
					variant="warning"
					to="/admin/update">
					update
				</b-button>
			</b-col>
			<b-col md="auto">
				<b-button-group>
					<b-button
						class="mx-1"
						size="sm"
						:variant="showShortBio === true ? `danger` : `outline-danger`"
						:disabled="showShortBio === true"
						@click="toggleBio">
						short
					</b-button>
					<b-button
						class="mx-1"
						size="sm"
						:variant="showShortBio === false ? `primary` : `outline-primary`"
						:disabled="showShortBio === false"
						@click="toggleBio">
						long
					</b-button>
				</b-button-group>
			</b-col>
		</b-row>
		<b-row class="mt-3" align-h="center">
			<b-col cols="12">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div class="bio-text" v-html="getMarkdown" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { getMarkdown } from "../../utils/markdown";

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
			getMarkdown () {
				if (this.showShortBio) {
					return this.short ? getMarkdown(this.short) : ""; // if short is empty, show empty string
				} else {
					return this.long ? getMarkdown(this.long) : ""; // if long is empty, show empty string
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
