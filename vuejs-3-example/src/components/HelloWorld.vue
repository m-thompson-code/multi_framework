<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  msg: {
    type: String,
    required: true,
    default: "2"
  }
});

const count = ref(0);
</script>

<template>
  <h1>{{ props.msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit ssss
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped></style>
