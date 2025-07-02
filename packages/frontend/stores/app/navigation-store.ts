import type { ActionItem } from "~/types";
import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth-store";

export const useNavigationStore = defineStore("navigation", () => {
  const authStore = useAuthStore();

  const options = computed<ActionItem[]>(() => {
    let base: ActionItem[] = [
      {
        label: "notes",
        icon: "mdi-newspaper-variant-outline",
        to: "/notes"
      },
      {
        label: "experiences",
        icon: "mdi-briefcase-outline",
        to: "/experiences"
      }
    ];

    if (authStore.isLoggedIn) {
      base = [
        ...base,
        {
          label: "profile",
          icon: "mdi-logout",
          color: "warning",
          to: "/profile/edit"
        },
        {
          label: "logout",
          icon: "mdi-logout",
          color: "error",
          action: () => authStore.logout()
        }
      ];
    }

    return base;
  });

  return { options };
});
