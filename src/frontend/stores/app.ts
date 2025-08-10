import type { ActionItem } from "~/types";
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const showSidebar = ref(false);

  const isSidebarVisible = computed(() => showSidebar.value);

  const getNavItems = computed<ActionItem[]>(() => {
    return [
      {
        label: "notes",
        to: "/notes"
      },
      {
        label: "experiences",
        to: "/experiences"
      }
    ];
  });

  function toggleSidebar() {
    showSidebar.value = !showSidebar.value;
  }

  return { isSidebarVisible, getNavItems, toggleSidebar };
});

export const useNotificationStore = defineStore("notification", () => {
  const messages = ref<{ id: number, message: string, seen: boolean }[]>([]);
  const errors = ref<{ id: number, error: Error, seen: boolean }[]>([]);

  const getMessages = computed(() => messages.value);
  const getErrors = computed(() => errors.value);

  function addMessage(message: string) {
    messages.value.push({
      id: (1 + messages.value.length + errors.value.length),
      message,
      seen: false
    });
  }

  function addError(err: Error) {
    errors.value.push({
      id: (1 + messages.value.length + errors.value.length),
      error: err,
      seen: false
    });
  }

  return {
    getMessages,
    getErrors,
    addMessage,
    addError
  };
});
