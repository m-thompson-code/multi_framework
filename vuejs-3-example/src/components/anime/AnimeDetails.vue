<template>
  <div class="flex gap-4">
    <div>
      <span class="text-base text-green-700">Episodes:</span>
      {{ props.animeData.selectedAnime.episodes }}
    </div>
    <div class="w-[2px] bg-gray-300"></div>
    <div>
      <span class="text-base text-green-700">Score:</span>
      {{ props.animeData.selectedAnime.score }}
    </div>
    <div>
      <span class="text-base text-green-700">Duration:</span>
      {{ props.animeData.selectedAnime.duration }}
    </div>
  </div>
  <div v-if="props.animeData.description">Description: {{ props.animeData.description }}</div>
</template>

<script setup lang="ts">
import { AnimeTypeStore } from "../../store/anime.store";

const props = defineProps<{
  animeData: AnimeTypeStore;
}>();
</script>

<style scoped></style>
