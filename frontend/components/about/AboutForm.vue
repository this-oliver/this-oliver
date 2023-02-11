<template>
	<base-form title="Edit Bio">
		<v-tabs v-model="currentTab">
			<v-tab>Short Bio</v-tab>
			<v-tab>Long Bio</v-tab>
		</v-tabs>

		<v-tabs-items v-model="currentTab">
			<!-- short bio -->
			<v-tab-item class="pa-2">
				<input-text-editor v-model="form.short" />
			</v-tab-item>

			<!-- long bio -->
			<v-tab-item class="pa-2">
				<input-text-editor v-model="form.long" />
			</v-tab-item>
		</v-tabs-items>

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
	</base-form>
</template>

<script>
import { mapActions } from "vuex";
import { getWordCount } from "../../utils/string";
import { isHtml, HtmlToMarkdown } from "../../utils/parser";

import BaseForm from "../base/BaseForm.vue";
import InputTextEditor from "../base/InputTextEditor.vue";

export default {
	name: "AboutForm",
	components: { BaseForm, InputTextEditor },
	props: {
		user: {
			type: Object,
			default: null
		},
		editMode: {
			type: Boolean,
			default: false
		}
	},
	emits: ["updated"],
	data () {
		return {
			form: {
				short: null,
				long: null
			},
			currentTab: null
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
			this.form.short = this.user.bio.short;
			this.form.long = this.user.bio.long;

			if(isHtml(this.form.short)) this.form.short = HtmlToMarkdown(this.form.short);
			if(isHtml(this.form.long)) this.form.long = HtmlToMarkdown(this.form.long);
		}
	},
	methods: {
		...mapActions({
			patch: "admin/patch"
		}),
		async update(){
			await this.patch({name: null, email: null, short: this.form.short, long: this.form.long});
			this.$emit("updated");
		}
	}
};
</script>
