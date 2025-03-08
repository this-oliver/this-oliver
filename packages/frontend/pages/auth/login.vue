<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const { notify } = useNotification();
const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const redirect = ref<string | undefined>(router.currentRoute.value.query.redirect as string);

async function login() {
  try {
    const loggedIn = await authStore.login(email.value, password.value);

    if (loggedIn) {
      notify("Authentictaion", "Login successful", "success");
      router.push(redirect.value ?? "/");
    } else {
      notify("Authentictaion", "Login failed", "error");
    }
  } catch (error) {
    notify("Authentictaion", (error as Error).message || "Login failed", "error");
  }
}
</script>

<template>
  <BasePage title="Login">
    <v-row justify="center">
      <v-col md="7">
        <BaseForm>
          <BaseInputText
            v-model="email"
            label="Email" />
          <BaseInputText
            v-model="password"
            label="Password"
            type="password" />
        </BaseForm>
      </v-col>
      <v-divider class="border-opacity-0" />
      <v-col cols="auto">
        <BaseBtn
          large
          color="primary"
          @click="login">
          Login
        </BaseBtn>
      </v-col>
    </v-row>
  </BasePage>
</template>
