<template>
  <AnimeForm @form-submit="onFormSubmit($event)" />

  <div class="my-3">Total Selected Data: {{ animeStore.getStoredAnime.length }}</div>

  <AnimeCard
    v-for="data in animeStore.getStoredAnime"
    :key="data.selectedAnime.popularity"
    :anime-data="data"
    @delete-clicked="onDelete(data)"
    @details-clicked="onDetails(data)"
  >
  </AnimeCard>
</template>

<script setup lang="ts">
import AnimeCard from "../components/anime/AnimeCard.vue";
import AnimeForm from "../components/anime/AnimeForm.vue";
import { AnimeTypeStore, useAnimeStore } from "../store/anime.store";

const animeStore = useAnimeStore();

const onFormSubmit = (value: AnimeTypeStore) => {
  console.log("value", value);
  animeStore.saveAnimeToStore(value);
};

const onDetails = (data: AnimeTypeStore) => {
  console.log("details");
};

const onDelete = (data: AnimeTypeStore) => {
  animeStore.deleteAnimeFromStore(data);
};
</script>

<style scoped></style>
