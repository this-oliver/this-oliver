<script setup lang="ts">
import type { Note } from "~/types";
import { useNoteStore } from "~/stores/note-store";

const errorReasons: string[] = [
  "The note may have been deleted",
  "The note may have been unpublished",
  "The note may have been moved"
];

const router = useRouter();
const noteStore = useNoteStore();
const { formatDate } = useTime();

const { data, status } = useAsyncData("note", async () => {
  const slug = router.currentRoute.value.params.slug as string;
  const note: Note = await noteStore.getNote(slug);

  const title = `${note.title} - oliverrr`;
  const description = note.content.substring(0, 150) + (note.content.length > 150 ? "..." : "");

  useSeoMeta({
    title,
    description,
    author: "oliverrr",
    ogType: "article",
    ogUrl: `https://www.oliverrr.net/notes/${note.slug}`,
    ogTitle: note.title,
    ogDescription: note.content,
    ogSiteName: "oliverrr's notes"
  });

  return note;
});

const note = computed<Note | null>(() => data.value || null);
const noteDate = computed<string>(() => note.value ? formatDate(note.value?.createdAt) : "");

const isBrowser = ref(false);
const RothkoCard = ref<any>(null);

onMounted(async () => {
  isBrowser.value = typeof window !== "undefined";
  if (isBrowser.value) {
    RothkoCard.value = (await import("rothko-js")).RothkoCard;
  }
});
</script>

<template>
  <base-page>
    <div v-if="status === 'pending'">
      <span class="loader" />
    </div>

    <base-card v-if="!note" class="bg-red-400 flex flex-col items-center">
      <h2 class="text-xl font-bold">
        This is awkward...
      </h2>

      <img src="/images/this-is-fine.jpg" alt="Meme of a dog in a burning room saying 'This is fine'" width="50%">

      <div id="note-content">
        <p>
          We couldn't find the note <span class="note-title">"{{ router.currentRoute.value.params.slug }}"</span> and there are a few possible reasons for this:
        </p>
        <ul class="error-list">
          <li
            v-for="reason in errorReasons"
            :key="reason">
            {{ reason }}
          </li>
        </ul>
      </div>
    </base-card>

    <div v-else class="w-full flex flex-col gap-2">
      <base-btn
        class="w-2/12"
        @click="router.push('/notes')">
        <icon name="mdi-arrow-left" class="text-2xl" />
        Back
      </base-btn>

      <!-- Only show RothkoCard in browser -->
      <template v-if="isBrowser && RothkoCard">
        <component
          :is="RothkoCard"
          id="note-options"
          :source="note.title"
          class="flex h-[6rem]" />
      </template>

      <div class="font-bold">
        <span class="text-lg">{{ noteDate }}</span>
        <h1 class="text-3xl">
          {{ note.title }}
        </h1>
      </div>

      <markdown-card :markdown="note.content" />
    </div>
  </base-page>
</template>
