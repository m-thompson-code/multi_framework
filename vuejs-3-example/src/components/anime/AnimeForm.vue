<template>
  <h2 class="mb-2 text-xl text-center text-green-800">Choose an Anime</h2>
  <form @submit.prevent="onSubmit">
    <!-- name search -->
    <AnimeFormSearch v-model:model-value="model.selectedAnime" />

    <!-- show text area checkbox -->
    <div class="flex items-center justify-end gap-4">
      <label for="showTextArea">show text area</label>
      <input v-model="showTextArea" name="showTextArea" type="checkbox" />
    </div>

    <!-- description -->
    <template v-if="showTextArea">
      <label>Description</label>
      <textarea v-model="model.description" />
    </template>

    <!-- text if no description -->
    <div v-else class="p-4 text-center rounded-md bg-slate-400">No text area</div>

    <!-- checkbox -->
    <div class="flex items-center justify-end gap-4">
      <label for="isCool">Is anime cool?</label>
      <input v-model="model.isCool" name="isCool" type="checkbox" />
    </div>

    <!-- submit -->
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import type { AnimeFormType } from "../../models";
import { AnimeTypeStore } from "../../store/anime.store";
import { useValidator } from "../../utils";
import AnimeFormSearch from "./AnimeFormSearch.vue";

const emit = defineEmits<{
  (e: "formSubmit", value: AnimeTypeStore): void;
}>();

const showTextArea = ref(false);

const model = ref<AnimeFormType>({
  selectedAnime: null,
  description: "",
  isCool: false
  // willError: 'lol',
});

const errors = computed(() => {
  // getting value because hard to debug
  const showTextAreaValue = showTextArea.value;
  const modelValue = model.value;

  const descriptionError = showTextAreaValue
    ? useValidator({
        value: modelValue.description,
        type: "text",
        validations: {
          required: {
            value: true,
            message: "Value is required"
          }
        }
      })
    : { errors: [] };

  return { descriptionError };
});

watchEffect(() => {
  //   console.log("effectScope");
  //   console.log(showTextArea.value);
  //   ^^ this is reactive
  //   console.log(showTextArea);
  //   ^^ this is not reactive
});

const onSubmit = () => {
  if (!model.value.selectedAnime) {
    console.log("Submit form - no selected anime");
    return;
  }

  if (errors.value.descriptionError.errors.length > 0) {
    console.log("Submit form - description error");
    return;
  }

  console.log("submitting", model.value);

  emit("formSubmit", {
    selectedAnime: model.value.selectedAnime,
    description: model.value.description,
    isCool: model.value.isCool
  });
};
</script>

<style scoped></style>
