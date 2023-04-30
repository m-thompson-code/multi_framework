<template>
  <div>
    <div
      v-display-for-time="{ seconds: bannerTime }"
      class="w-full p-4 text-xl text-center text-white bg-red-500"
      @remainingTime="bannerTimeRef--"
    >
      Remaining time for banner: {{ bannerTimeRef }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  bannerTime: {
    type: Number,
    required: false,
    default: 6,
    validator: (value: number) => value > 0
  }
});

const bannerTimeRef = ref(props.bannerTime);
</script>

<style scoped></style>
