<template>
  <div>
    <div v-sticky="'top'" class="w-full">This is a heading</div>
    <div
      v-display-for-time-2="{ seconds: bannerTime }"
      class="w-full p-4 text-xl text-center text-white bg-red-500"
      @remainingTime="bannerTime--"
    >
      Remaining time for banner: {{ bannerTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
const bannerTime = ref(6);
</script>

<style scoped></style>
