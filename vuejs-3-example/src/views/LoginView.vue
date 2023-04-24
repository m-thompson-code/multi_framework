<template>
  <main class="w-full max-w-[640px] h-[100vh] mx-auto grid place-content-center px-3 sm:px-6">
    <form class="w-[400px]" @submit.prevent="onSubmit">
      <h3 class="text-center">Login Credentials</h3>
      <input
        v-model="model"
        required
        minlength="3"
        autocomplete="off"
        type="text"
        name="username"
        placeholder="Enter username"
      />
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "../store";

const model = ref<string>("");
const authenticationStore = useAuthenticationStore();
const router = useRouter();

const onSubmit = () => {
  authenticationStore.login(model.value);
  router.push("/dashboard");
};
</script>

<style scoped></style>
