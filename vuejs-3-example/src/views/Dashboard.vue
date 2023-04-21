<template>
  <AnimeForm @form-submit="onFormSubmit($event)" />

  <div class="mt-12 mb-3">Total Selected Data: {{ animeStore.getStoredAnime.length }}</div>

  <div class="flex flex-col gap-4">
    <GeneralCard
      v-for="data in animeStore.getStoredAnime"
      :key="data.selectedAnime.popularity"
      :title="data.selectedAnime.title"
      :show-button-delete="true"
      :show-button-details="true"
      @details-clicked="onDetails(data)"
      @delete-clicked="onDelete(data)"
    >
      <AnimeDetails :anime-data="data" />
    </GeneralCard>
  </div>

  <footer class="max-h-14"></footer>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import AnimeDetails from "../components/anime/AnimeDetails.vue";
import AnimeForm from "../components/anime/AnimeForm.vue";
import GeneralCard from "../components/shared/GeneralCard.vue";
import { AnimeTypeStore, useAnimeStore } from "../store/anime.store";

const animeStore = useAnimeStore();
const router = useRouter();

const onFormSubmit = (value: AnimeTypeStore) => {
  animeStore.saveAnimeToStore(value);
};

function onDetails(data: AnimeTypeStore) {
  router.push(`/anime/${data.selectedAnime.mal_id}`);
}

const onDelete = (data: AnimeTypeStore) => {
  animeStore.deleteAnimeFromStore(data);
};
</script>

<style scoped></style>
