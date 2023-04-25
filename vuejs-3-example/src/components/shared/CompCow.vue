<template>
  <div v-if="isLoading" class="w-[400px] h-[300px] animate-pulse bg-gray-500 p-2"></div>
  <div v-else-if="error">Failed</div>
  <img v-else :src="imageOptions.src" class="w-[400px] h-[300px]" />
</template>

<script setup lang="ts">
import { useImage } from "@vueuse/core";

onMounted(() => {
  console.log("[Cow] component on Mounted");
});

const imageOptions = ref({
  src: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80"
});
const { isLoading, error } = useImage(imageOptions, { delay: 2500 });
</script>

<style scoped></style>
