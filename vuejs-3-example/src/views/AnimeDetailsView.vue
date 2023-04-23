<template>
  <GeneralCard :title="animeData.selectedAnime.title">
    <AnimeDetails :anime-data="animeData" />
  </GeneralCard>
</template>

<script setup lang="ts">
import AnimeDetails from "../components/anime/AnimeDetails.vue";
import GeneralCard from "../components/shared/GeneralCard.vue";
import { AnimeTypeStore, useAnimeStore } from "../store/anime.store";

const route = useRoute();
const animeStore = useAnimeStore();

const animeId = route.params.id as string;
const animeData = animeStore.getAnimeTypeStoreById(Number(animeId)) as AnimeTypeStore;

onMounted(() => {
  console.log("mounted");
});
</script>

<style scoped></style>
