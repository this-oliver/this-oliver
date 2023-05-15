<script setup lang="ts">
import type { Note, ActionItem, Tag } from '~/types'
import { useNoteStore } from '~/stores/note-store'

const inputBackgroundColor = 'white darken-2'
const previewBackgroundColor = 'white darken-4'

const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    default: undefined
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const noteStore = useNoteStore()
const router = useRouter()
const { notify } = useNotification()
const { getRandomColor } = useColor()

const title = ref<string>('')
const content = ref<string>('')
const selectedTags = ref<string[]>([])
const tags = ref<Tag[]>([])
const publish = ref<boolean>(true)

type Mode = 'write' | 'preview' | 'split'
const currentMode = ref<Mode>('write')

const formattedTags = computed(() => {
  return tags.value.map(tag => tag.name)
})

const validForm = computed<boolean>(() => {
  return (
    !!title.value &&
    !!content.value
  )
})

const options = computed<ActionItem[]>(() => {
  return [
    {
      label: 'Cancel',
      color: 'secondary',
      icon: 'mdi-cancel',
      action: () => { router.back() }
    },
    {
      label: props.editMode ? 'Save' : 'Create',
      color: 'primary',
      icon: 'mdi-content-save',
      disabled: !validForm.value,
      action: async () => {
        try {
          const note = props.editMode && props.note
            ? await noteStore.patchNote(props.note._id, {
              title: title.value,
              content: content.value,
              tags: _processTags(selectedTags.value),
              publish: publish.value
            })

            : await noteStore.postNote({
              title: title.value,
              content: content.value,
              tags: _processTags(selectedTags.value),
              publish: publish.value
            })

          notify('Notes', 'Note saved successfully', 'success')
          router.push(`/notes/${note.slug}`)
        } catch (error) {
          const message = (error as Error).message || 'Failed to process note'
          notify('Notes', message, 'error')
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
            await noteStore.deleteNote(props.note._id)
            notify('Notes', 'Note deleted successfully', 'success')
            router.push('/notes')
          } catch (error) {
            const message = (error as Error).message || 'Failed to delete note'
            notify('Notes', message, 'error')
          }
        }
      }
    }
  ]
})

const modes = computed<ActionItem[]>(() => {
  return [
    {
      label: 'write',
      color: 'primary',
      icon: 'mdi-pencil'
    },
    {
      label: 'preview',
      color: 'primary',
      icon: 'mdi-eye'
    },
    {
      label: 'split',
      color: 'primary',
      icon: 'mdi-view-split-vertical'
    }
  ]
})

/**
 * Returns a list of tags that are either new or already exist.
 *
 * NOTE: New tags are converted to Tag objects with a random color and
 * old tags are returned as is.
 */
function _processTags (sampleTags: string[]): Tag[] {
  return sampleTags.map((tag) => {
    // check if tag already exists
    const existingTag = tags.value.find(t => t.name === tag)

    if (existingTag) {
      return existingTag
    } else {
      return {
        _id: '',
        name: tag,
        color: getRandomColor()
      }
    }
  })
}

onMounted(async () => {
  if (props.note) {
    title.value = props.note.title ?? ''
    content.value = props.note.content ?? ''
    publish.value = props.note.publish ?? false
  }

  tags.value = await noteStore.indexTags()
})
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
          :items="formattedTags"
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
    </v-row>

    <v-tabs
      v-model="currentMode"
      density="compact"
      size="small">
      <v-tab
        v-for="mode in modes"
        :key="mode.label"
        :value="mode.label"
        color="primary"
        variant="flat">
        {{ mode.label }}
      </v-tab>
    </v-tabs>

    <v-window
      id="form-content"
      v-model="currentMode">
      <v-window-item value="write">
        <v-sheet :color="inputBackgroundColor">
          <base-input-text-area
            v-model="content"
            class="note-input"
            place-holder="Thoughts..." />
        </v-sheet>
      </v-window-item>

      <v-window-item value="preview">
        <v-sheet :color="previewBackgroundColor">
          <markdown-card :markdown="content" />
        </v-sheet>
      </v-window-item>

      <v-window-item value="split">
        <v-row>
          <v-col cols="6">
            <v-sheet :color="inputBackgroundColor">
              <base-input-text-area
                v-model="content"
                class="note-input"
                place-holder="Thoughts..." />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet :color="previewBackgroundColor">
              <markdown-card :markdown="content" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </base-form>
</template>

<style scoped>
#form-content{
  min-height: 50vh;
}

.note-input {
  min-height: 60vh;
}
</style>
