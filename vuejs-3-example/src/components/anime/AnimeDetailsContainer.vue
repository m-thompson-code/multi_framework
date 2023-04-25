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

    <!-- display buttons for dynamic component -->
    <div class="grid mt-20 place-content-center">
      <div class="flex items-center justify-center gap-4 mb-10">
        <button class="bg-blue-500 general" @click="dynamicComponent = CompShark">Shark</button>
        <button class="bg-white general" @click="dynamicComponent = CompCow">Cow</button>
      </div>

      <!-- dynamic component -->
      <component :is="dynamicComponent" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { AnimeTypeStore, useAnimeStore } from "../../store/anime.store";
import CompCow from "../shared/CompCow.vue";
import CompShark from "../shared/CompShark.vue";

const route = useRoute();
const animeStore = useAnimeStore();

const showModal = ref<boolean>(false);
const animeId = route.params.id as string;
const animeData = animeStore.getAnimeTypeStoreById(Number(animeId)) as AnimeTypeStore;

const dynamicComponent = ref();

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

// used to display loading state for suspense
const loadingPromise = () =>
  new Promise<void>((resolve, rej) => {
    setTimeout(() => {
      console.log("resolved promise");
      resolve();
    }, 3000);
  });

await loadingPromise();
</script>

<style scoped lang="sass"></style>
