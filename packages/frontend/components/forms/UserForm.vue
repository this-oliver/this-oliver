<script setup lang="ts">
import type { ActionItem, User } from "~/types";
import { useUserStore } from "~/stores/user-store";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  },
  editMode: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const userStore = useUserStore();
const { notify } = useNotification();

const description = ref<string>(props.user.status);

const validForm = computed<boolean>(() => {
  return (
    !!description.value
    && description.value.trim().length > 0
  );
});

const options = computed<ActionItem[]>(() => {
  return [
    {
      label: "Cancel",
      color: "secondary",
      icon: "mdi-cancel",
      action: () => {
        router.back();
      }
    },
    {
      label: "Update",
      color: "success",
      icon: "mdi-content-save",
      disabled: !validForm.value,
      action: _updateUser
    }
  ];
});

async function _updateUser() {
  try {
    await userStore.updateUser({ status: description.value });

    notify("User", "User updated successfully", "success");
    router.push("/");
  } catch (error) {
    const message = (error as Error).message || "Failed to process user";
    notify("Notes", message, "error");
  }
}
</script>

<template>
  <base-form :options="options">
    <v-row>
      <v-col cols="12">
        <content-editor v-model="description" />
      </v-col>
    </v-row>
  </base-form>
</template>
