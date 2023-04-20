<template>
  <GeneralCard :title="props.animeData.selectedAnime.title" @delete-clicked="onDelete" @details-clicked="onDetails">
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
    </div>
    <div v-if="props.animeData.description">Description: {{ props.animeData.description }}</div>
  </GeneralCard>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { AnimeTypeStore } from "../../store/anime.store";
import GeneralCard from "../shared/GeneralCard.vue";

const props = defineProps({
  animeData: {
    type: Object as PropType<AnimeTypeStore>,
    required: true
  }
});

const emit = defineEmits<{
  (e: "deleteClicked", value: void): void;
  (e: "detailsClicked", value: void): void;
}>();

const onDetails = () => {
  emit("detailsClicked");
};

const onDelete = () => {
  emit("deleteClicked");
};
</script>

<style scoped></style>
