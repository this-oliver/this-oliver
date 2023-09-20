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

const title = ref<string>('');
const content = ref<string>('');
const selectedTags = ref<string[]>([]);
const tags = ref<string[]>([]);
const publish = ref<boolean>(true);

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
					const note = props.editMode && props.note
						? await noteStore.patchNote(props.note._id, {
							title: title.value,
							content: content.value,
							tags: selectedTags.value,
							publish: publish.value
						})

						: await noteStore.postNote({
							title: title.value,
							content: content.value,
							tags: selectedTags.value,
							publish: publish.value
						});

					notify('Notes', 'Note saved successfully', 'success');
					router.push(`/notes/${note.slug}`);
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

onMounted(async () => {
	if (props.note) {
		title.value = props.note.title ?? '';
		content.value = props.note.content ?? '';
		publish.value = props.note.publish ?? false;
	}

	tags.value = await noteStore.indexTags();
});
</script>

<template>
  <base-form :options="options">
    <v-row>
      <v-col cols="12">
        <BaseInputText
          v-model="title"
          label="Title" />
      </v-col>
      <v-col
        cols="12"
        md="8">
        <v-combobox
          v-model="selectedTags"
          :items="tags"
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
          color="success"
          label="Publish" />
      </v-col>

      <v-col cols="12">
        <content-editor v-model="content" />
      </v-col>
    </v-row>
  </base-form>
</template>
