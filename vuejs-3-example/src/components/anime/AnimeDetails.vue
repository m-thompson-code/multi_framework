<!-- eslint-disable vue/no-v-html -->
<template>
  <DefineTemplate v-slot="{ name, value }">
    <div class="space-x-1">
      <span
        class="text-base"
        :class="{ 'text-green-700': !props.animeData.isCool, 'text-yellow-700': props.animeData.isCool }"
      >
        {{ name }}
      </span>
      <span> {{ value }} </span>
    </div>
  </DefineTemplate>

  <article>
    <div class="flex gap-4 mb-2">
      <div v-html="renderHtml2('User', animeData.user.name)"></div>

      <div v-if="props.animeData.description" class="w-[2px] bg-gray-300"></div>

      <div v-if="props.animeData.description" v-html="renderHtml2('Description', props.animeData.description)"></div>
    </div>
    <div class="flex gap-4">
      <ReuseTemplate name="Episodes" :value="props.animeData.selectedAnime.episodes" />

      <div class="w-[2px] bg-gray-300"></div>

      <ReuseTemplate name="Score" :value="props.animeData.selectedAnime.score" />

      <div class="w-[2px] bg-gray-300"></div>

      <ReuseTemplate name="Duration" :value="props.animeData.selectedAnime.duration" />

      <div class="w-[2px] bg-gray-300"></div>

      <div>Equation: {{ hardMathEquationMemo(props.animeData.selectedAnime.score) }}</div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { createReusableTemplate } from "@vueuse/core";
import { hardMathEquationMemo } from "../../models/api-anime-data.model";
import { AnimeTypeStore } from "../../store/anime.store";

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ name: string; value: string | number }>();

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
