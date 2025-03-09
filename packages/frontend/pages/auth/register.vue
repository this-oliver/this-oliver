<script setup lang="ts">
const { notify } = useNotification();

const email = ref("mail@mail.com");
const password = ref("");

const validEmail = computed<boolean>(() => {
  if (email.value.length === 0) {
    return false;
  }

  const regex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  return regex.test(email.value);
});

const validPassword = computed<boolean>(() => {
  return password.value.length > 0;
});

async function registerWithPasskey() {
  interface ChallengeResponse {
    challenge: string
    userId: string
    userName: string
    userDisplayName: string
  }

  const runtimeConfig = useRuntimeConfig();

  try {
    if (!window.isSecureContext) {
      throw new Error("Not in secure context");
    }

    const initialRes = await useFetch(`${runtimeConfig.public.api}/api/auth/register/passkey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email.value, stage: "init" })
    });

    const res = initialRes.data.value as unknown as ChallengeResponse;

    const cred = await window.navigator.credentials.create({
      publicKey: {
        challenge: Uint8Array.from(new TextEncoder().encode(res.challenge)),
        pubKeyCredParams: [
          { type: "public-key", alg: -7 }
        ],
        rp: {
          // TODO: enforce in production
          // id: 'oliverrr.net',
          name: "oliverrr"
        },
        user: {
          id: Uint8Array.from(new TextEncoder().encode(res.userId)),
          name: res.userName.split("@")[0],
          displayName: res.userDisplayName
        }
      }
    });

    if (!cred) {
      throw new Error("No credential returned");
    }

    const response: AuthenticatorAttestationResponse = (cred as PublicKeyCredential).response as AuthenticatorAttestationResponse;
    const pk = response.getPublicKey();
    const pkAlgo = response.getPublicKeyAlgorithm();
    const transports = response.getTransports();

    if (!pk || !pkAlgo || !transports) {
      throw new Error("Invalid credential returned (missing public key, algorithm or transports)");
    }

    const body = {
      stage: "complete",
      id: res.userId,
      email: email.value,
      publicKey: btoa(String.fromCharCode(...new Uint8Array(pk))),
      publicKeyAlgorithm: pkAlgo,
      transports
    };

    const completeRes = await useFetch(`${runtimeConfig.public.api}/api/auth/register/passkey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!completeRes.data.value) {
      throw new Error("Passkey failed");
    }

    notify("Authentictaion", "Passkey successful", "success");
  } catch (error) {
    notify("Authentictaion", `Passkey failed - ${error}`, "error");
  }
}
</script>

<template>
  <BasePage title="Register">
    <v-row justify="center">
      <v-col md="7">
        <BaseForm>
          <BaseInputText v-model="email" label="Email" />
          <BaseInputText v-model="password" label="Admin Secret" type="password" />
        </BaseForm>
      </v-col>
      <v-divider class="border-opacity-0" />
      <v-col cols="auto">
        <base-btn
          large
          color="primary"
          :disabled="!validEmail || !validPassword"
          @click="registerWithPasskey">
          Register with passkey
        </base-btn>
      </v-col>
    </v-row>
  </BasePage>
</template>
