<script setup lang="ts">
import type { ActionItem, Experience, ExperienceType } from "~/types";
import { useExperienceStore } from "~/stores/experience-store";

const props = defineProps({
  experience: {
    type: Object as PropType<Experience>,
    default: undefined
  },
  editMode: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const { notify } = useNotification();
const experienceStore = useExperienceStore();

const currentYear = new Date().getFullYear();

const title = ref<string>();
const org = ref<string>();
const startYear = ref<number>();
const endYear = ref<number>();
const description = ref<string>();
const type = ref<ExperienceType>();
const link = ref<string>();
const image = ref<string>();

const types = computed<ExperienceType[]>(() => {
  return ["job", "education", "project"];
});

const validForm = computed<boolean>(() => {
  return (
    !!title.value
    && !!org.value
    && !!startYear.value
    && !!endYear.value
    && !!description.value
    && !!type.value
    && !!link.value
    && !!image.value
  );
});

const options = computed<ActionItem[]>(() => {
  return [
    {
      label: "Cancel",
      color: "secondary",
      icon: "mdi-cancel",
      action: () => router.push("/experiences")
    },
    {
      label: props.editMode ? "Save" : "Create",
      color: "success",
      icon: props.editMode ? "mdi-content-save" : "mdi-plus",
      disabled: !validForm.value,
      action: async () => {
        try {
          const xp: Partial<Experience> = {
            title: title.value,
            org: org.value,
            startYear: startYear.value,
            endYear: endYear.value,
            description: description.value,
            type: type.value,
            link: link.value,
            image: image.value
          };

          if (props.editMode && props.experience) {
            await experienceStore.patchExperience(props.experience._id, xp);
          } else {
            await experienceStore.postExperience(xp);
          }

          notify("Experience Saved", `Experience ${props.editMode ? "updated" : "created"} successfully`, "success");
          router.push("/experiences");
        } catch (error) {
          const message = (error as Error).message || "Failed to process request";
          notify("Experience Error", message, "error");
        }
      }
    },
    {
      label: "Delete",
      color: "error",
      icon: "mdi-delete",
      action: async () => {
        try {
          if (!props.experience) {
            throw new Error("Experience not found");
          }

          await experienceStore.deleteExperience(props.experience._id);
          notify("Experience Deleted", "Experience deleted successfully", "success");
          router.push("/experiences");
        } catch (error) {
          const message = (error as Error).message || "Failed to process request";
          notify("Experience Error", message, "error");
        }
      }
    }
  ];
});

onMounted(() => {
  if (props.experience) {
    title.value = props.experience.title;
    org.value = props.experience.org;
    startYear.value = props.experience.startYear;
    endYear.value = props.experience.endYear;
    description.value = props.experience.description;
    type.value = props.experience.type;
    link.value = props.experience.link;
    image.value = props.experience.image;
  }
});
</script>

<template>
  <base-form :options="options">
    <BaseInputText
      v-model="title"
      label="Title" />
    <BaseInputText
      v-model="org"
      label="Org" />
    <BaseInputText
      v-model="startYear"
      label="Start Year"
      :place-holder="`${currentYear}`" />
    <BaseInputText
      v-model="endYear"
      label="End Year"
      :place-holder="`${currentYear}`" />
    <BaseInputText
      v-model="link"
      label="Link"
      place-holder="example.com" />
    <BaseInputText
      v-model="image"
      label="Image"
      place-holder="example.com/image.webp" />

    <v-select
      v-model="type"
      :items="types"
      label="Type" />

    <content-editor v-model="description" />
  </base-form>
</template>
