<template>
	<div>
		<v-sheet
			tile
			outlined
			class="mt-1 pa-1 pa-md-2">
			<v-row
				v-if="editor"
				no-gutters>
				<v-col
					cols="auto"
					class="ma-1">
					<base-btn
						small
						:class="{ 'is-active': editor.isActive('bold') }"
						@click="editor.chain().focus().toggleBold().run()">
						<b>B</b>
					</base-btn>
				</v-col>
				<v-col
					cols="auto"
					class="ma-1">
					<base-btn
						small
						:class="{ 'is-active': editor.isActive('italic') }"
						@click="editor.chain().focus().toggleItalic().run()">
						<i>italic</i>
					</base-btn>
				</v-col>
				<v-col
					cols="auto"
					class="ma-1">
					<base-btn
						small
						:class="{ 'is-active': editor.isActive('strike') }"
						@click="editor.chain().focus().toggleStrike().run()">
						<s>strike</s>
					</base-btn>
				</v-col>
				<v-col
					cols="auto"
					class="ma-1">
					<base-btn
						small
						:class="{ 'is-active': editor.isActive('bulletList') }"
						@click="editor.chain().focus().toggleBulletList().run()">
						bullet list
					</base-btn>
				</v-col>
				<v-col
					cols="auto"
					class="ma-1">
					<base-btn
						small
						:class="{ 'is-active': editor.isActive('orderedList') }"
						@click="editor.chain().focus().toggleOrderedList().run()">
						ordered list
					</base-btn>
				</v-col>
				<v-col
					cols="auto"
					class="ma-1">
					<base-btn
						small
						light
						text
						outline
						@click="showPreview = !showPreview">
						preview
						<!--<span class="black--text">preview</span>-->
					</base-btn>
				</v-col>
			</v-row>

			<v-sheet
				tile
				rounded="lg"
				outlined
				min-height="100px"
				class="mt-1 pa-1">
				<editor-content :editor="editor" />
			</v-sheet>

			<TTBubleMenu
				v-if="editor"
				:editor="editor">
				<base-btn
					small
					:is-active="editor.isActive('heading', { level: 1 })"
					@click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
					h1
				</base-btn>
				<base-btn
					small
					:is-active="editor.isActive('heading', { level: 2 })"
					@click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
					h2
				</base-btn>
				<base-btn
					small
					:is-active="editor.isActive('heading', { level: 3 })"
					@click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
					h3
				</base-btn>
				<base-btn
					small
					:is-active="editor.isActive('paragraph')"
					@click="editor.chain().focus().setParagraph().run()">
					paragraph
				</base-btn>
			</TTBubleMenu>
		</v-sheet>

		<div
			v-if="label"
			class="mt-1 secondary--text">
			<small>
				<i>{{ label }}</i>
			</small>
		</div>

		<v-dialog v-model="showPreview">
			<v-sheet
				tile
				outlined
				class="mt-1 pa-1 pa-md-2">
				<!--eslint-disable-next-line vue/no-v-html-->
				<div v-html="getHtml" />
			</v-sheet>
		</v-dialog>
	</div>
</template>

<script>
import {
	Editor,
	EditorContent,
	BubbleMenu as TTBubleMenu
} from "@tiptap/vue-2";
import TTHighlight from "@tiptap/extension-highlight";
import TTLink from "@tiptap/extension-link";
import TTPlaceholder from "@tiptap/extension-placeholder";
import TTStarterKit from "@tiptap/starter-kit";
import TTTextAlign from "@tiptap/extension-text-align";
import TTTypography from "@tiptap/extension-typography";
import BaseBtn from "./BaseBtn.vue";

export default {
	components: { EditorContent, BaseBtn, TTBubleMenu },
	props: {
		label: {
			type: String,
			default: null
		},
		hint: {
			type: String,
			default: "Write something..."
		},
		value: {
			type: [String, Number],
			default: null
		}
	},
	emits: ["input"],
	data() {
		return {
			editor: null,
			showPreview: false
		};
	},
	computed: {
		getHtml() {
			return this.editor?.getHTML();
		}
	},
	watch: {
		value(value) {
			const isDifferent = this.editor.getHTML() !== value;
			if (isDifferent) this.editor.commands.setContent(value, false);
		}
	},
	mounted() {
		this.setupEditor();
	},
	beforeUnmount() {
		this.editor.destroy();
	},
	methods: {
		setupEditor() {
			this.editor = new Editor({
				content: this.value,
				autofocus: true,
				extensions: [
					TTStarterKit,
					TTHighlight,
					TTLink.configure({
						openOnClick: false
					}),
					TTPlaceholder.configure({
						// Use a placeholder:
						placeholder: this.hint
					}),
					TTTextAlign,
					TTTypography
				],
				onUpdate: () => {
					// HTML
					this.$emit("input", this.editor.getHTML());
				}
			});
		}
	}
};
</script>
