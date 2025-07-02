<script setup lang="ts">
import type { User } from "~/types";
import { browserSupportsWebAuthn, startRegistration } from "@simplewebauthn/browser";
import { useAuthStore } from "~/stores/auth-store";
import { useUserStore } from "~/stores/user-store";

definePageMeta({ middleware: ["auth"] });

const { notify } = useNotification();
const { request } = useRequest();

const authStore = useAuthStore();
const userStore = useUserStore();
const user = ref<User>(await userStore.getUser(true) as User);

const hasPasskeySupport = computed<boolean>(() => browserSupportsWebAuthn());

export interface PasskeyConfig {
  challenge: string
  user: { id: string, name: string, displayName: string }
  rp: { id?: string, name: string }
  pubKeyCredParams: { type: "public-key", alg: number }[]
}

export interface PasskeyCred {
  challenge: string
  user: { id: string, name: string, displayName: string }
  rp: { id?: string, name: string }
  pubKeyCredParams: { type: "public-key", alg: number }[]
}

async function registerWithPasskey() {
  // const runtimeConfig = useRuntimeConfig();

  try {
    if (!hasPasskeySupport.value) {
      throw new Error("Not in secure context");
    }

    const passkeyConfig = await request("/auth/register/passkey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ stage: "init" })
    });

    const verification = await startRegistration({ optionsJSON: passkeyConfig });

    const passkeySave = await request("/auth/register/passkey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ stage: "complete", attestation: verification })
    });

    if (!passkeySave.data.value) {
      throw new Error("Passkey failed");
    }

    notify("Authentictaion", "Passkey successful", "success");
  } catch (error) {
    notify("Authentictaion", `Passkey failed - ${error}`, "error");
  }
}

onMounted(async () => {
  if (!user.value) {
    notify("User", "User not found", "error");
    useRouter().push("/");
  }
});
</script>

<template>
  <base-page title="Update Profile">
    <h2>Bio</h2>
    <user-form :user="user" />
    <h2>Security</h2>
    <base-btn
      v-if="hasPasskeySupport"
      large
      color="primary"
      @click="registerWithPasskey">
      Setup passkey
    </base-btn>
  </base-page>
</template>
