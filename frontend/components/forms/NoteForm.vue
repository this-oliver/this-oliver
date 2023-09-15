<script setup lang="ts">
import type { Note, ActionItem } from '~/types';
import { useNoteStore } from '~/stores/note-store';

const props = defineProps({
	note: {
		type: Object as PropType<Note>,
		default: undefined
	},
	editMode: {
		type: Boolean,
		default: false
	}
});

const noteStore = useNoteStore();
const router = useRouter();
const { notify } = useNotification();

const availableTags = ref<string[]>([]);
const uploading = ref<boolean>(false);

const title = ref<string>('');
const content = ref<string>('');
const tags = ref<string[]>([]);
const publish = ref<boolean>(false);

const isNewNote = computed<boolean>(() => {
	return !props.editMode && !props.note;
});

const validForm = computed<boolean>(() => {
	return (
		!!title.value &&
    !!content.value
	);
});

const options = computed<ActionItem[]>(() => {
	return [
		{
			label: 'Cancel',
			color: 'secondary',
			icon: 'mdi-cancel',
			action: () => { router.back(); }
		},
		{
			label: props.editMode ? 'Save' : 'Create',
			color: 'success',
			icon: 'mdi-content-save',
			disabled: !validForm.value,
			action: async () => {
				try {
					const form: Partial<Note> = {
						title: title.value,
						content: content.value,
						tags: tags.value,
						publish: publish.value
					};

					if (isNewNote.value) {
						await postNote(form);
					} else {
						await patchNote((props.note as Note)._id, form);
					}

					notify('Notes', 'Note saved successfully', 'success');
				} catch (error) {
					const message = (error as Error).message || 'Failed to process note';
					notify('Notes', message, 'error');
				}
			}
		},
		{
			label: 'Delete',
			color: 'error',
			icon: 'mdi-delete',
			action: async () => {
				if (props.editMode && props.note) {
					try {
						await noteStore.deleteNote(props.note._id);
						notify('Notes', 'Note deleted successfully', 'success');
						router.push('/notes');
					} catch (error) {
						const message = (error as Error).message || 'Failed to delete note';
						notify('Notes', message, 'error');
					}
				}
			}
		}
	];
});

async function postNote (note: Partial<Note>): Promise<Note> {
	uploading.value = true;
	const newNote = await noteStore.postNote(note);
	uploading.value = false;

	return newNote;
}

async function patchNote (id: string, note: Partial<Note>): Promise<Note> {
	uploading.value = true;
	const patchedNote = await noteStore.patchNote(id, note);
	uploading.value = false;

	return patchedNote;
}

// handle timer for patching note
let timer: NodeJS.Timeout | null = null;

// delay between patching notes
const PATCH_DELAY = 5000;
let allowPatch = true;

// minimum number of content changes before patching
const MIN_CONTENT_CHANGE = 15;
let contentChangeCount = 0;

// compare old form with new form
watch(content, async (newContent, oldContent) => {
	// track whether the change is caused by `onMounted`
	const initialChange: boolean = !oldContent || oldContent.length === 0;

	// track the number of times the content has changed
	if (!initialChange) {
		contentChangeCount += 1;
	}

	// check if the change is significant enough to patch
	const significantChange: boolean = contentChangeCount > MIN_CONTENT_CHANGE;

	if (allowPatch && significantChange && !initialChange && !isNewNote.value) {
		allowPatch = false;

		try {
			// patch note
			await patchNote((props.note as Note)._id, { title: title.value, content: newContent, tags: tags.value, publish: publish.value });

			// reset content change count
			contentChangeCount = 0;

			// set timer to prevent patching too often
			timer = setTimeout(() => {
				allowPatch = true;
			}, PATCH_DELAY);
		} catch (error) {
			allowPatch = true;

			if (timer) {
				clearTimeout(timer);
				timer = null;
			}

			notify('Notes', 'Failed to automatically patch note', 'error');
		}
	}
});

onMounted(async () => {
	if (props.note) {
		title.value = props.note.title ?? '';
		content.value = props.note.content ?? '';
		publish.value = props.note.publish ?? false;
		tags.value = props.note.tags ?? [];
	}

	availableTags.value = await noteStore.indexTags();
});
</script>

<template>
  <base-form :options="options">
    <v-row>
      <v-col cols="12">
        <BaseInputText
          v-model="title"
          label="Title"
          :loading="uploading" />
      </v-col>
      <v-col
        cols="12"
        md="8">
        <v-combobox
          v-model="tags"
          :items="availableTags"
          :loading="uploading"
          label="Tags"
          chips
          multiple
          deletable-chips />
      </v-col>
      <v-col
        cols="auto"
        md="4">
        <v-switch
          v-model="publish"
          :inset="true"
          :loading="uploading"
          color="success"
          label="Publish" />
      </v-col>

      <v-col cols="12">
        <content-editor
          v-model="content"
          :loading="uploading" />
      </v-col>
    </v-row>
  </base-form>
</template>
