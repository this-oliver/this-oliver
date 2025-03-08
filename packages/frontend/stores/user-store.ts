import type { User } from "~/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRequest } from "~/composables/useRequest";
import { useAuthStore } from "./auth-store";

export const useUserStore = defineStore("user", () => {
  const { request } = useRequest();
  const authStore = useAuthStore();

  const user = ref<User | null>(null);

  /**
   * Returns the user object
   * @param force - fetch user from server even if it's already in the store
   */
  async function getUser(force?: boolean): Promise<User> {
    if (user.value && !force) {
      return user.value;
    }

    return await request("/users/oliver");
  }

  /**
   * Updates and returns the user object
   * @param patch - the user object to update
   */
  async function updateUser(patch: Partial<User>): Promise<User> {
    user.value = await request("/admin/users", {
      headers: { Authorization: `Bearer ${authStore.token}` },
      method: "PATCH",
      body: JSON.stringify(patch)
    });

    return user.value as User;
  }

  return {
    user,
    getUser,
    updateUser
  };
});
