<script setup lang="ts">
import type { ActionItem } from '~/types'

const inputBackgroundColor = 'white darken-2'
const previewBackgroundColor = 'white darken-4'

type Mode = 'write' | 'preview' | 'split'

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined
  },
  viewMode: {
    type: String as PropType<Mode>,
    default: 'write'
  }
})

const emit = defineEmits(['update:modelValue'])

const content = ref<string>(props.modelValue || '')
const currentMode = ref<Mode>(props.viewMode)

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

watch(() => props.modelValue, (value) => {
  content.value = value as string
})

watch(content, () => {
  emit('update:modelValue', content.value)
})

</script>

<template>
  <div id="content-form">
    <v-tabs
      id="content-form-tabs"
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
      id="content-form-windows"
      v-model="currentMode">
      <v-window-item value="write">
        <v-sheet
          class="input-field"
          :color="inputBackgroundColor">
          <base-input-text-area
            v-model="content"
            place-holder="Thoughts..." />
        </v-sheet>
      </v-window-item>

      <v-window-item value="preview">
        <v-sheet
          class="preview-field pa-2"
          :color="previewBackgroundColor">
          <markdown-card :markdown="content" />
        </v-sheet>
      </v-window-item>

      <v-window-item value="split">
        <v-row>
          <v-col cols="6">
            <v-sheet
              class="input-field"
              :color="inputBackgroundColor">
              <base-input-text-area
                v-model="content"
                place-holder="Thoughts..." />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet
              class="preview-field pa-2"
              :color="previewBackgroundColor">
              <markdown-card :markdown="content" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </div>
</template>

<style>
#content-form{
  height: 100%;
}

.preview-field{
  height: 50vh;
}

.input-field textarea{
  height: 50vh;
}
</style>
