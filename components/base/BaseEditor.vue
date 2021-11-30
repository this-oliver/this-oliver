<template>
	<div id="base-editor">
		<v-btn-toggle v-if="editor">
			<base-editor-button
				is-text
				:is-active="editor.isActive('bold')"
				@click="editor.chain().focus().toggleBold().run()">
				bold
			</base-editor-button>
			<base-editor-button
				is-text
				:is-active="editor.isActive('italic')"
				@click="editor.chain().focus().toggleItalic().run()">
				italic
			</base-editor-button>
			<base-editor-button
				is-text
				:is-active="editor.isActive('strike')"
				@click="editor.chain().focus().toggleStrike().run()">
				strike
			</base-editor-button>
			<base-editor-button
				is-text
				:is-active="editor.isActive('highlight')"
				@click="editor.chain().focus().toggleHighlight().run()">
				highlight
			</base-editor-button>
			<base-editor-button
				is-text
				:is-active="editor.isActive({ textAlign: 'left' })"
				@click="editor.chain().focus().setTextAlign('left').run()">
				left
			</base-editor-button>
			<base-editor-button
				is-text
				:is-active="editor.isActive({ textAlign: 'center' })"
				@click="editor.chain().focus().setTextAlign('center').run()">
				center
			</base-editor-button>
			<base-editor-button
				is-text
				:is-active="editor.isActive({ textAlign: 'right' })"
				@click="editor.chain().focus().setTextAlign('right').run()">
				right
			</base-editor-button>
			<base-editor-button
				is-text
				:is-active="editor.isActive('link')"
				@click="setLink">
				setLink
			</base-editor-button>
			<base-editor-button
				is-text
				:is-disabled="!editor.isActive('link')"
				@click="editor.chain().focus().unsetLink().run()">
				unsetLink
			</base-editor-button>
		</v-btn-toggle>

		<t-bubble-menu
			v-if="editor"
			:editor="editor">
			<base-editor-button
				hide-outline
				:is-active="editor.isActive('heading', { level: 1 })"
				@click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
				h1
			</base-editor-button>
			<base-editor-button
				hide-outline
				:is-active="editor.isActive('heading', { level: 2 })"
				@click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
				h2
			</base-editor-button>
			<base-editor-button
				hide-outline
				:is-active="editor.isActive('heading', { level: 3 })"
				@click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
				h3
			</base-editor-button>
			<base-editor-button
				hide-outline
				:is-active="editor.isActive('paragraph')"
				@click="editor.chain().focus().setParagraph().run()">
				paragraph
			</base-editor-button>
		</t-bubble-menu>

		<t-editor-content :editor="editor" />
	</div>
</template>

<script>
import { Editor, EditorContent as TEditorContent, BubbleMenu as TBubbleMenu } from "@tiptap/vue-2";
import THighlight from "@tiptap/extension-highlight";
import TLink from "@tiptap/extension-link";
import TStarterKit from "@tiptap/starter-kit";
import TTextAlign from "@tiptap/extension-text-align";
import TTypography from "@tiptap/extension-typography";
import BaseEditorButton from "./BaseEditorButton.vue";

export default {
	components: {
		TEditorContent,
		TBubbleMenu,
		BaseEditorButton
	},

	props: {
		value: {
			type: String,
			default: ""
		}
	},
	emits: ["input"],

	data() {
		return {
			editor: null
		};
	},

	watch: {
		value(value) {
			// HTML
			const isSame = this.editor.getHTML() === value;

			// JSON
			// const isSame = this.editor.getJSON().toString() === value.toString()

			if (isSame) {
				return;
			}

			this.editor.commands.setContent(value, false);
		}
	},

	mounted() {
		this.editor = new Editor({
			extensions: [
				TStarterKit,
				THighlight,
				TTextAlign,
				TTypography,
				TLink.configure({
					openOnClick: false
				})
			],
			content: this.value,
			onUpdate: () => {
				// HTML
				this.$emit("input", this.editor.getHTML());

				// JSON
				// this.$emit('input', this.editor.getJSON())
			}
		});
	},

	beforeUnmount() {
		this.editor.destroy();
	},

	methods: {
		setLink(){
			const previousUrl = this.editor.getAttributes("link").href;
			const url = window.prompt("URL", previousUrl);

			// cancelled
			if (url === null) {
				return;
			}

			// empty
			if (url === "") {
				this.editor
					.chain()
					.focus()
					.extendMarkRange("link")
					.unsetLink()
					.run();

				return;
			}

			// update link
			this.editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url })
				.run();
		}
	}
};
</script>

<style scoped>
#base-editor{
	width: 100%;
	padding: 5px;

	border: thin solid darkgrey;
	border-radius: 10px;
}
</style>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  margin-top: 1rem;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
</style>
