import type { Experience } from "~/types";
import { defineStore } from "pinia";

export const useExperienceStore = defineStore("experience", () => {
  const experiences = ref<Experience[]>([]);

  const filter = reactive({
    projects: false,
    education: false,
    work: false
  });

  const getExperiences = computed<Experience[]>(() => experiences.value);

  function setExperiences(xp: Experience[]) {
    const list = [...experiences.value, ...xp];

    // filter out duplicates
    const uniqueList = list.filter((item, index) => {
      return list.findIndex(i => i._id === item._id) === index;
    });

    experiences.value = sortLatestExperiencesByDate(uniqueList);
  };

  function sortLatestExperiencesByDate(experiences: Experience[]) {
    let xp = [...experiences];

    xp = xp.sort((a, b) => {
      // sort experiences by start date:
      // experiences with the latest start year should be at the beginning of the array

      if (a.startYear > b.startYear) {
        return -1;
      } else if (a.startYear < b.startYear) {
        return 1;
      } else {
        return 0;
      }
    });

    xp = xp.sort((a, b) => {
      // sort experiences by end date:
      // experiences with the latest end year should be at the beginning of the array

      if (a.endYear > b.endYear) {
        return -1;
      } else if (a.endYear < b.endYear) {
        return 1;
      } else {
        return 0;
      }
    });

    xp = xp.sort((a, b) => {
      // sort experiences by context:
      // experiences with an empty end year (null or 'present') should be at the beginning of the array

      if (a.endYear === null || a.endYear === undefined || a.endYear === 0) {
        return -1;
      } else if (b.endYear === null || b.endYear === undefined || b.endYear === 0) {
        return 1;
      } else {
        return 0;
      }
    });

    return xp;
  }

  return {
    filter,
    getExperiences,
    setExperiences
  };
});
