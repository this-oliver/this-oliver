<script setup lang="ts">
import BaseImage from '~/components/base/BaseImage.vue';
import { ActionItem } from '~/types';

const props = defineProps({
	label: {
		type: String,
		required: true
	},
	components: {
		type: Array as PropType<Component[]>,
		required: true
	},
	options: {
		type: Array as PropType<ActionItem[]>,
		default: () => []
	},
	allowSearch: {
		type: Boolean,
		default: false
	},
	search: {
		type: String,
		default: ''
	},
	loading: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['search']);

const search = ref<string>('');
const showSearchField = ref<boolean>(false);

watch(search, (value) => {
	emit('search', value);
});

onMounted(() => {
	search.value = props.search;

	if (search.value) {
		showSearchField.value = true;
	}
});

</script>

<template>
  <v-row>
    <v-col
      v-if="props.options"
      md="auto">
      <base-btn
        v-if="allowSearch && !showSearchField"
        class="mx-1 mt-2 mt-md-0"
        outlined
        @click="showSearchField = true">
        <v-icon
          icon="mdi-magnify"
          size="small"
          class="mr-1" />
        Search
      </base-btn>
      <base-btn
        v-for="option in props.options"
        :key="option.label"
        class="mx-1 mt-2 mt-md-0"
        :outlined="option.outlined"
        :text="option.text"
        :color="option.color"
        :to="option.to"
        @click="option.action">
        <v-icon
          v-if="option.icon"
          :icon="option.icon"
          size="small"
          class="mr-1" />

        {{ option.label }}
      </base-btn>
    </v-col>

    <v-col
      v-if="props.options && showSearchField"
      class="mt-2"
      cols="12">
      <base-input-text
        v-model="search"
        class="mx-1"
        placeholder="Search...">
        <template #append-inner>
          <base-btn
            small
            plain
            @click="search = ''; showSearchField = false;">
            <v-icon
              icon="mdi-close"
              size="small" />
          </base-btn>
        </template>
      </base-input-text>
    </v-col>
  </v-row>

  <v-row justify="center">
    <v-col
      v-if="props.loading"
      cols="12">
      <h2 class="mt-2">
        Fetching <span class="label text-primary">{{ props.label }}</span>...
      </h2>

      <v-skeleton-loader
        class="mt-2"
        type="card"
        width="100%" />
    </v-col>

    <v-col
      v-else-if="props.components.length === 0"
      cols="12">
      <h2 class="mt-2">
        No <span class="label text-primary">{{ props.label }}</span> found
      </h2>

      <base-image
        src="/images/this-is-fine.jpg"
        alt="Meme of a dog in a burning room saying 'This is fine'"
        width="100%"
        class="mt-2" />
    </v-col>

    <v-col
      v-for="(component, index) in props.components"
      :key="index"
      cols="12">
      <component :is="component" />
    </v-col>
  </v-row>
</template>

<style scoped>
.label {
  font-weight: bold;
  text-decoration: underline;
}
</style>
