<template>
  <nav class="flex items-center justify-between w-full gap-4 p-4 bg-green-700">
    <router-link to="/dashboard"> Dashboard </router-link>
    <router-link to="/login" @click="onLogOut"> Logout </router-link>
  </nav>

  <!-- banner -->
  <Banner :banner-time="8" />

  <!-- bottom sticky -->
  <div v-sticky:bottom>This is a bottom</div>

  <h3 class="mt-20 text-xl text-center">Welcome: {{ authenticationStore.user?.name }}</h3>

  <main class="w-full max-w-[840px] mx-auto mt-20 px-3 sm:px-6">
    <RouterView v-slot="{ Component, route }" class="route-view">
      <Transition name="fade" mode="out-in">
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import { useAnimeStore, useAuthenticationStore } from "../../store";

const authenticationStore = useAuthenticationStore();
const animeStore = useAnimeStore();

const onLogOut = () => {
  authenticationStore.logout();
  animeStore.clearAnimeStore();
};
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(60px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
