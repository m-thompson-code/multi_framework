<template>
  <h2 class="mb-2 text-xl text-center text-green-800">Choose an Anime</h2>
  <form @submit.prevent="onSubmit">
    <!-- name search -->
    <input v-model="model.selectedAnime" type="text" placeholder="Enter anime name" />
    <div v-if="errors.selectedAnimeError?.errors" class="flex flex-col">
      <span v-for="(err, index) of errors.selectedAnimeError.errors" :key="index" class="text-red-400">{{ err }}</span>
    </div>

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
import type { AnimeFormType } from "../models";
import { useValidator } from "../utils";

const emit = defineEmits<{
  (e: "formSubmit", value: AnimeFormType): void;
}>();

const showTextArea = ref(false);

const model = ref<AnimeFormType>({
  selectedAnime: "",
  description: "",
  isCool: false
  // willError: 'lol',
});

const errors = computed(() => {
  // getting value because hard to debug
  const showTextAreaValue = showTextArea.value;
  const modelValue = model.value;

  const selectedAnimeError = useValidator({
    value: modelValue.selectedAnime,
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

  return { selectedAnimeError, descriptionError };
});

watchEffect(() => {
  //   console.log("effectScope");
  //   console.log(showTextArea.value);
  //   ^^ this is reactive
  //   console.log(showTextArea);
  //   ^^ this is not reactive
});

const onSubmit = () => {
  if (errors.value.selectedAnimeError.errors.length > 0) {
    return;
  }

  if (errors.value.descriptionError.errors.length > 0) {
    return;
  }

  emit("formSubmit", model.value);
};
</script>

<style scoped>
form {
  @apply flex flex-col gap-4;
}

textarea,
input {
  @apply border border-gray-300 rounded-md p-2;
}

button[type="submit"] {
  @apply px-5 py-2 bg-green-700 text-white hover:bg-green-400 rounded-lg text-lg cursor-pointer duration-300 transition-all;
}
</style>
