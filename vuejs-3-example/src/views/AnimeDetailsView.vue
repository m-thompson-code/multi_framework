<template>
  <section>
    <GeneralCard :title="animeData.selectedAnime.title" :show-edit-button="true" @edit-clicked="onModalDisplay">
      <AnimeDetails :anime-data="animeData" />
    </GeneralCard>

    <InputModal
      :show-modal="showModal"
      :input-value="animeData.description"
      @confirm-clicked="(e) => onModalConfirm(e)"
      @cancel-clicked="onModalCancel"
    />
  </section>
</template>

<script setup lang="ts">
import AnimeDetails from "../components/anime/AnimeDetails.vue";
import GeneralCard from "../components/shared/GeneralCard.vue";
import { AnimeTypeStore, useAnimeStore } from "../store/anime.store";

const route = useRoute();
const animeStore = useAnimeStore();

const showModal = ref<boolean>(false);
const animeId = route.params.id as string;
const animeData = animeStore.getAnimeTypeStoreById(Number(animeId)) as AnimeTypeStore;

onMounted(() => {
  console.log("mounted");
});

const onModalDisplay = () => {
  showModal.value = true;
};

const onModalCancel = () => {
  showModal.value = false;
};

const onModalConfirm = (newValue: string) => {
  animeStore.editAnimeInStore(animeData.selectedAnime.mal_id, newValue);
  showModal.value = false;
};
</script>

<style scoped></style>
