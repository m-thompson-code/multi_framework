<template>
  <nav class="flex items-center justify-between w-full gap-4 p-4 bg-green-700">
    <router-link to="/about" class="link"> About </router-link>
    <router-link to="/login" class="link"> Logout </router-link>
  </nav>

  <main class="w-full max-w-[840px] mx-auto mt-20">
    <router-view />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.link {
  @apply px-5 py-2 text-white hover:bg-green-400 rounded-lg text-lg cursor-pointer duration-300 transition-all;
}
</style>
