<template>
  <div class="relative flex flex-col">
    <!-- search text input -->
    <input v-model="searchRef" type="text" placeholder="Search.." @keydown="onInputKeyDown" />

    <!-- errors in search -->
    <div v-if="errors.selectedAnimeError.errors.length > 0" class="flex flex-col mb-2">
      <span v-for="(err, index) of errors.selectedAnimeError.errors" :key="index" class="text-red-400">{{ err }}</span>
    </div>

    <!-- results -->
    <div v-if="!searchLoadingRef && !searchSelectedRef && searchRef.length > 3" class="flex flex-col w-full">
      <button
        v-for="data in animeStore.getLoadedAnime"
        :key="data.title"
        type="button"
        class="select-value"
        @click="onClick(data)"
      >
        {{ data.title }}
      </button>
    </div>
    <div v-else-if="searchLoadingRef && searchRef.length > 3">Loading ...</div>
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
import { PropType, computed, ref, watchEffect } from "vue";
import { AnimeData } from "../../models/api-anime-data.model";
import { useAnimeStore } from "../../store/anime.store";
import { useValidator } from "../../utils";

const animeStore = useAnimeStore();

const props = defineProps({
  modelValue: {
    type: Object as PropType<AnimeData | null>,
    required: false,
    default: null
  }
});

const emit = defineEmits<{
  (e: "update:modelValue", value: AnimeData): void;
}>();

const searchRef = ref<string>("");
// remember the selected value
const searchSelectedRef = ref<boolean>(false);
// mark to true to show loading screen
const searchLoadingRef = ref<boolean>(false);

watchEffect(() => {
  // when props change from parent, put this value in input
  console.log("Parent changing Anime Form search prop", props.modelValue);
  searchRef.value = props.modelValue?.title ?? "";
});

// wait some time before firing api call
watchDebounced(
  searchRef,
  () => {
    // fetching anime data from api, don't fetch if I already selected
    if (searchRef.value.length > 3 && !searchSelectedRef.value) {
      searchSelectedRef.value = false;
      searchLoadingRef.value = false;
      animeStore.fetchAnime(searchRef.value);
    }
  },
  { debounce: 1000 }
);

// error validation for searchable text input
const errors = computed(() => {
  const modelValue = searchRef.value;

  const selectedAnimeError = useValidator({
    value: modelValue,
    type: "text",
    validations: {
      required: {
        value: true,
        message: "Value is required"
      },
      min: {
        value: 3,
        message: "Value must be at least 3 characters"
      }
    }
  });

  return { selectedAnimeError };
});

const onClick = (data: AnimeData) => {
  // update search with whole value
  searchRef.value = data.title;

  // set selected to true
  searchSelectedRef.value = true;

  // set loading to false
  searchLoadingRef.value = false;

  // emit event to parent
  emit("update:modelValue", data);
};

const onInputKeyDown = () => {
  console.log("onInputKeyDown");
  searchLoadingRef.value = true;
  searchSelectedRef.value = false;
};
</script>

<style scoped>
.select-value {
  @apply w-full p-4 even:bg-gray-300 odd:bg-gray-100 border rounded-lg border-gray-700 cursor-pointer hover:bg-green-100 text-start duration-300 transition-all;
}
</style>
