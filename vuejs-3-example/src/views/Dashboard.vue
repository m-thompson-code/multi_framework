<template>
  <AnimeForm @form-submit="onFormSubmit($event)" />
</template>

<script setup lang="ts">
import AnimeForm from "../components/AnimeForm.vue";
import { AnimeFormType } from "../models";

const onFormSubmit = (value: AnimeFormType) => {
  console.log("value", value);
};
</script>

<style scoped></style>
