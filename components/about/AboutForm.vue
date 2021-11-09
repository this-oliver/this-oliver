<template>
	<base-form title="about you">
		<!-- short bio -->
		<v-row
			class="mt-2"
			justify="space-between">
			<v-col
				sm="6"
				md="auto">
				<span class="mr-3">short</span>
				<small>{{ getShortLength }}</small>
			</v-col>
			<v-col
				sm="auto"
				md="auto">
				<span
					class="simple-link"
					color="outline-primary"
					@click="showShortBioForm=true">
					preview
				</span>
			</v-col>
			<v-col
				class="mt-2"
				cols="12">
				<input-text-block v-model="form.short" label="short bio"/>
			</v-col>
		</v-row>
		<!-- long bio -->
		<v-row
			class="mt-2"
			justify="space-between">
			<v-col
				sm="6"
				md="auto">
				<span class="mr-3">long</span>
				<small>{{ getLongLength }}</small>
			</v-col>
			<v-col
				sm="auto"
				md="auto">
				<span
					class="simple-link"
					color="outline-primary"
					@click="showLongBioForm=true">
					preview
				</span>
			</v-col>
			<v-col
				class="mt-2"
				cols="12">
				<input-text-block v-model="form.long" label="long bio" />
			</v-col>
		</v-row>
		<!-- actions -->
		<v-row
			class="mt-2"
			justify="space-between">
			<v-col
				class="mt-1"
				sm="3"
				md="3">
				<v-btn
					block
					color="secondary"
					@click="$router.go(-1)">
					back
				</v-btn>
			</v-col>
			<v-col
				class="mt-1"
				sm="8"
				md="3">
				<v-btn
					v-if="editMode"
					block
					color="warning"
					@click="update()">
					update
				</v-btn>
				<v-btn
					v-else
					block
					color="primary"
					@click="post">
					post
				</v-btn>
			</v-col>
		</v-row>

		<!-- modals -->
		<v-dialog v-model="showShortBioForm">
			<span v-if="form.short && form.short.length > 0">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<span v-html="getParsedContent(form.short)" />
			</span>
			<span v-else>...</span>
		</v-dialog>
		<v-dialog v-model="showLongBioForm">
			<span v-if="form.long && form.long.length > 0">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<span v-html="getParsedContent(form.long)" />
			</span>
			<span v-else>...</span>
		</v-dialog>
	</base-form>
</template>

<script>
import { mapActions } from "vuex";
import { MarkdownToHtml } from "../../utils/markdown";
import { getWordCount } from "../../utils/string";
import BaseForm from "../base/BaseForm.vue";
import InputTextBlock from "../base/InputTextBlock.vue";

export default {
	name: "AboutForm",
	components: { BaseForm, InputTextBlock },
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
			patch: "admin/patch"
		}),
		async update(){
			await this.patch({name: null, email: null, short: this.form.short, long: this.form.long});
			this.$router.push("/admin");
		},
		getParsedContent (text) {
			if (text) {
				return MarkdownToHtml(text);
			} else {
				return null;
			}
		}
	}
};
</script>
