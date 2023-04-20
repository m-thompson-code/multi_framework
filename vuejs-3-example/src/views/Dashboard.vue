<template>
  <AnimeForm @form-submit="onFormSubmit($event)" />

  <div class="my-3">Total Selected Data: {{ animeStore.getStoredAnime.length }}</div>

  <div v-for="data in animeStore.getStoredAnime" :key="data.selectedAnime.popularity">
    {{ data.selectedAnime.title }}
  </div>
</template>

<script setup lang="ts">
import AnimeForm from "../components/AnimeForm.vue";
import { AnimeTypeStore, useAnimeStore } from "../store/anime.store";
const animeStore = useAnimeStore();

const onFormSubmit = (value: AnimeTypeStore) => {
  console.log("value", value);
  animeStore.saveAnimeToStore(value);
};
</script>

<style scoped></style>
