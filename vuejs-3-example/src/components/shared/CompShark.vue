<template>
  <div v-if="isLoading" class="w-[400px] h-[300px] animate-pulse bg-gray-500 p-2"></div>
  <div v-else-if="error">Failed</div>
  <img v-else :src="imageOptions.src" class="w-[400px] h-[300px]" />
</template>

<script setup lang="ts">
import { useImage } from "@vueuse/core";

onMounted(() => {
  console.log("[Shark] component on Mounted");
});

const imageOptions = ref({ src: "https://cdn.britannica.com/79/65379-050-5CF52BAC/Shortfin-mako-shark-seas.jpg" });
const { isLoading, error } = useImage(imageOptions, { delay: 2500 });
</script>

<style scoped></style>
