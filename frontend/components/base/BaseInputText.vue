<script setup lang="ts">

type Vibe = undefined | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: undefined
  },
  placeHolder: {
    type: String,
    default: undefined
  },
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => {
      return ['text', 'password'].includes(value)
    }
  },
  vibe: {
    type: String as PropType<Vibe>,
    default: undefined
  },
  compact: {
    type: Boolean,
    default: false
  },
  isValid: {
    type: Boolean || null,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['input'])

const data = reactive({
  input: null as unknown as string,
  showDateMenu: false,
  showPassword: false
})

const density = computed(() => {
  return props.compact ? 'compact' : 'default'
})

function setData (value: string) {
  data.input = value
}

watch(
  () => data.input,
  (newInput) => {
    emits('input', newInput)
  }
)

watch(
  () => props.value,
  (newValue) => {
    setData(newValue)
  }
)
</script>

<template>
  <v-text-field
    v-if="type === 'password'"
    v-model="data.input"
    :label="label"
    :placeholder="placeHolder"
    :type="data.showPassword ? 'text' : 'password'"
    :density="density"
    :variant="vibe"
    :loading="props.loading"
    :success="props.isValid"
    :error="props.isValid === false">
    <template #append-inner>
      <base-btn
        small
        color="grey"
        :hide-from-tab="true"
        @click="data.showPassword = !data.showPassword">
        {{ data.showPassword ? 'hide' : 'show' }}
      </base-btn>
    </template>
  </v-text-field>

  <v-text-field
    v-else
    v-model="data.input"
    :label="label"
    :placeholder="placeHolder"
    :type="type"
    :density="density"
    :variant="vibe"
    :loading="props.loading"
    :success="props.isValid"
    :error="!props.isValid === false">
    <template #append-inner>
      <slot name="append-inner" />
    </template>
  </v-text-field>
</template>
