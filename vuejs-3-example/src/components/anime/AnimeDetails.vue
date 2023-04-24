<!-- eslint-disable vue/no-v-html -->
<template>
  <article>
    <div class="flex gap-4 mb-2">
      <div v-html="renderHtml2('User', animeData.user.name)"></div>

      <div class="w-[2px] bg-gray-300"></div>

      <div v-if="props.animeData.description" v-html="renderHtml2('Description', props.animeData.description)"></div>
    </div>
    <div class="flex gap-4">
      <div v-html="renderHtml2('Episodes', props.animeData.selectedAnime.episodes)"></div>

      <div class="w-[2px] bg-gray-300"></div>

      <div v-html="renderHtml2('Score', props.animeData.selectedAnime.score)"></div>

      <div class="w-[2px] bg-gray-300"></div>

      <div v-html="renderHtml2('Duration', props.animeData.selectedAnime.duration)"></div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { AnimeTypeStore } from "../../store/anime.store";

const props = defineProps<{
  animeData: AnimeTypeStore;
}>();

const renderHtml2 = (name: string, value: string | number) => {
  const colorClass = !props.animeData.isCool ? "text-green-700" : "text-yellow-700";
  return `
      <span class="text-base ${colorClass}">
        ${name}:
      </span>
      <span>
        ${value}
      </span>
  `;
};
</script>

<style scoped></style>
