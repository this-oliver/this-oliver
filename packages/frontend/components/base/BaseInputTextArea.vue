<script setup lang="ts">

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
	outlined: {
		type: Boolean,
		default: true
	},
	isValid: {
		type: Boolean || null,
		default: null
	},
	loading: {
		type: Boolean,
		default: false
	}
});

const emits = defineEmits(['input']);

const data = reactive({
	input: null as unknown as string,
	showDateMenu: false,
	showPassword: false
});

function setData (value: string) {
	data.input = value;
}

watch(() => data.input, (newInput) => {
	emits('input', newInput);
});

watch(() => props.value, (newValue) => {
	setData(newValue);
});
</script>

<template>
  <v-textarea
    v-model="data.input"
    :label="label"
    :placeholder="placeHolder"
    :outlined="outlined"
    :auto-grow="true"
    :loading="loading"
    :success="isValid === true"
    :error="isValid === false" />
</template>
