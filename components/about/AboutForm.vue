<template>
	<div>
		<!-- short bio -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				sm="6"
				md="auto">
				<span class="form-subtitle mr-3">short</span>
				<small>{{ getShortLength }}</small>
			</b-col>
			<b-col
				sm="auto"
				md="auto">
				<span
					class="simple-link"
					variant="outline-primary"
					@click="showShortBioForm=true">
					preview
				</span>
			</b-col>
			<b-col
				class="mt-2"
				cols="12">
				<b-textarea
					v-model="form.short"
					rows="8" />
			</b-col>
		</b-row>
		<!-- long bio -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				sm="6"
				md="auto">
				<span class="form-subtitle mr-3">long</span>
				<small>{{ getLongLength }}</small>
			</b-col>
			<b-col
				sm="auto"
				md="auto">
				<span
					class="simple-link"
					variant="outline-primary"
					@click="showLongBioForm=true">
					preview
				</span>
			</b-col>
			<b-col
				class="mt-2"
				cols="12">
				<b-textarea
					v-model="form.long"
					rows="8" />
			</b-col>
		</b-row>
		<!-- actions -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				class="mt-1"
				sm="3"
				md="3">
				<b-button
					block
					variant="secondary"
					@click="$router.go(-1)">
					back
				</b-button>
			</b-col>
			<b-col
				class="mt-1"
				sm="8"
				md="3">
				<b-button
					v-if="editMode"
					block
					variant="warning"
					@click="update({name: null, email: null, short: form.short, long: form.long})">
					update
				</b-button>
				<b-button
					v-else
					block
					variant="primary"
					@click="post">
					post
				</b-button>
			</b-col>
		</b-row>

		<!-- modals -->
		<b-modal
			v-model="showShortBioForm"
			title="preview: short"
			hide-footer
			size="xl">
			<span v-if="form.short && form.short.length > 0">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<span v-html="getMarkDown(form.short)" />
			</span>
			<span v-else>...</span>
		</b-modal>
		<b-modal
			v-model="showLongBioForm"
			title="preview: long"
			hide-footer
			size="xl">
			<span v-if="form.long && form.long.length > 0">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<span v-html="getMarkDown(form.long)" />
			</span>
			<span v-else>...</span>
		</b-modal>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import { getMarkdown } from "../../utils/markdown";
	import { getWordCount } from "../../utils/string";

	export default {
		name: "AboutForm",
		props: {
			editMode: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				form: {
					short: null,
					long: null
				},
				showShortBioForm: false,
				showLongBioForm: false
			};
		},
		computed: {
			getShortLength () {
				const short = this.form.short;
				return getWordCount(short);
			},
			getLongLength () {
				const long = this.form.long;
				return getWordCount(long);
			}
		},
		created () {
			if (this.editMode) {
				const user = this.$store.getters["admin/getUser"];
				if (!user) { return; }
				this.form.short = user.bio.short;
				this.form.long = user.bio.long;
			}
		},
		methods: {
			...mapActions({
				update: "admin/patch"
			}),
			getMarkDown (text) {
				if (text) {
					return getMarkdown(text);
				} else {
					return null;
				}
			}
		}
	};
</script>
