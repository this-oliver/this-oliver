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
</script>

<template>
  <base-page class="md:w-6/12 md:mx-auto">
    <div v-if="status === 'pending'">
      <span class="loader" />
    </div>

    <error-card v-else-if="!note">
      <div class="text-start">
        <h2 class="text-xl font-bold">
          This is awkward...
        </h2>

        <p>
          We couldn't find the note <span class="underline">"{{ router.currentRoute.value.params.slug }}"</span> and there are a few possible reasons for this:
        </p>

        <ul class="list-disc">
          <li
            v-for="reason in errorReasons"
            :key="reason">
            {{ reason }}
          </li>
        </ul>
      </div>
    </error-card>

    <div v-else class="w-full flex flex-col gap-2">
      <base-btn
        class="w-2/12 flex items-center gap-2"
        @click="router.push('/notes')">
        <icon name="mdi-arrow-left" class="text-2xl" />
        Back
      </base-btn>

      <client-only>
        <RothkoCard
          :source="note.title"
          class="flex h-[6rem]" />
      </client-only>

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
