<template>
	<div>
		<b-row
			align-h="center">
			<b-col
				cols="auto">
				<b-button-group>
					<b-button
						class="mx-1"
						size="sm"
						:variant="(shortBio)?`primary`:`outline-primary`"
						@click="shortBio = true">
						long
					</b-button>
					<b-button
						class="mx-1"
						size="sm"
						:variant="(shortBio)?`outline-danger`:`danger`"
						@click="shortBio = false">
						short
					</b-button>
				</b-button-group>
			</b-col>
		</b-row>
		<b-row
			class="mt-3"
			align-h="center">
			<b-col
				cols="12">
				<div
					class="bio-text"
					v-html="getMarkdown" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { getMarkdown } from "../../middleware/markdown";

	export default {
		name: "BioCard",
		props: {
			short: {
				type: String,
				required: true
			},
			long: {
				type: String,
				required: true
			}
		},
		data () {
			return {
				shortBio: true
			};
		},
		computed: {
			getMarkdown () {
				return this.shortBio ? getMarkdown(this.short) : getMarkdown(this.long);
			}
		}
	};
</script>
