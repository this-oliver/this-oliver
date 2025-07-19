<script setup lang="ts">
import type { ActionItem } from "~/types";

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
    default: ""
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["search"]);

const search = ref<string>("");
const showSearchField = ref<boolean>(false);

watch(search, (value) => {
  emit("search", value);
});

onMounted(() => {
  search.value = props.search;

  if (search.value) {
    showSearchField.value = true;
  }
});
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div id="search" class="w-full flex gap-2 items-center justify-start mb-4">
      <div v-if="allowSearch && showSearchField" class="flex items-center gap-2 p-2 brutalist-outline">
        <input
          v-model="search"
          placeholder="Search...">
        <button class="cursor-pointer" @click="search = ''; showSearchField = false;">
          <icon name="mdi-close" class="text-lg" />
        </button>
      </div>

      <base-btn
        v-else-if="allowSearch"
        class="flex items-center gap-2"
        @click="showSearchField = true">
        <icon name="mdi-magnify" class="h-4 w-4 mr-1" />
        Search
      </base-btn>

      <base-btn
        v-for="option in props.options"
        :key="option.label"
        :to="option.to"
        class="flex items-center gap-2"
        @click="option.action">
        <icon v-if="option.icon" :name="option.icon" class="h-4 w-4 mr-1" />
        {{ option.label }}
      </base-btn>
    </div>

    <div id="items" class="w-full flex flex-col items-center">
      <div v-if="props.loading" class="w-full">
        <h2 class="mt-2 text-lg font-semibold">
          Fetching <span class="label text-blue-600 underline">{{ props.label }}</span>...
        </h2>
        <div class="mt-2 w-full h-32 bg-gray-200 animate-pulse rounded" />
      </div>

      <div v-else-if="props.components.length === 0" class="w-full">
        <h2 class="mt-2 text-lg font-semibold">
          No <span class="label text-blue-600 underline">{{ props.label }}</span> found
        </h2>
        <img
          src="/images/this-is-fine.jpg"
          alt="Meme of a dog in a burning room saying 'This is fine'"
          width="100%"
          class="mt-2">
      </div>

      <div
        v-for="(component, index) in props.components"
        :key="index"
        class="w-full mb-2">
        <component :is="component" />
      </div>
    </div>
  </div>
</template>
