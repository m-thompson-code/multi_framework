<template>
  <nav class="w-full p-4 flex items-center justify-between gap-4 bg-green-700">
    <router-link to="/about" class="link"> About </router-link>

    <router-link to="/login" class="link"> Logout </router-link>
  </nav>

  <h1>Dashboard</h1>

  <router-view />
</template>

<script setup lang="ts"></script>

<style scoped>
.link {
  @apply px-5 py-2 text-white hover:bg-green-400 rounded-lg text-lg cursor-pointer duration-300 transition-all;
}
</style>
