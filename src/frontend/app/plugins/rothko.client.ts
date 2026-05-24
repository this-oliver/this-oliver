import { RothkoCard } from "rothko-js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("RothkoCard", RothkoCard);
});
