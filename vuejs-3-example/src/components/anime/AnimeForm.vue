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

      <!-- errors in search -->
      <div v-if="errors.descriptionError.errors.length > 0" class="flex flex-col mb-2">
        <span v-for="(err, index) of errors.descriptionError.errors" :key="index" class="text-red-400">{{ err }}</span>
      </div>
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
// import { computed, ref, watchEffect } from "vue";
import { useValidator } from "../../composable/useValidator";
import type { AnimeFormType } from "../../models";
import { AnimeTypeStore, User, useAuthenticationStore } from "../../store";
import AnimeFormSearch from "./AnimeFormSearch.vue";

const emit = defineEmits<{
  (e: "formSubmit", value: AnimeTypeStore): void;
}>();

const authenticationStore = useAuthenticationStore();
const showTextArea = ref(false);

// need to use REF so that when form is rested it will be reflected on UI
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

watchEffect(
  () => {
    //   console.log("effectScope");
    //   console.log(showTextArea.value);
    //   ^^ this is reactive
    //   console.log(showTextArea);
    //   ^^ this is not reactive
  },
  {
    onTrack(e) {
      // triggered when count.value is tracked as a dependency
      console.log("onTrack", e);
    },
    onTrigger(e) {
      // triggered when count.value is mutated
      console.log("onTrigger", e);
    }
  }
);

const onSubmit = () => {
  const modelValues = model.value;

  if (!modelValues.selectedAnime) {
    console.log("Submit form - no selected anime");
    return;
  }

  if (errors.value.descriptionError.errors.length > 0) {
    console.log("Submit form - description error");
    return;
  }

  // console.log("submitting", modelValues);

  emit("formSubmit", {
    selectedAnime: modelValues.selectedAnime,
    description: modelValues.description,
    isCool: modelValues.isCool,
    user: authenticationStore.getUser as User
  });

  clearForm();
};

const clearForm = () => {
  showTextArea.value = false;
  model.value = {
    selectedAnime: null,
    description: "",
    isCool: false
  };
};
</script>

<style scoped></style>
