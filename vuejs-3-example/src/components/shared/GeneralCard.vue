<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <div class="flex items-center justify-between">
      <!-- header -->
      <h3 class="text-lg">{{ props.title }}</h3>
      <div class="flex items-center gap-2">
        <Icon
          v-if="showEditButton"
          icon="material-symbols:edit"
          class="w-8 h-8 cursor-pointer"
          @click="$emit('editClicked')"
        />

        <button
          v-if="showButtonDetails"
          type="button"
          class="text-white bg-blue-600 general"
          @click="$emit('detailsClicked')"
        >
          Details
        </button>
        <button
          v-if="showButtonDelete"
          type="button"
          class="text-white bg-red-600 general"
          @click="$emit('deleteClicked')"
        >
          Remove
        </button>
      </div>
    </div>

    <!-- divider -->
    <div class="w-full h-[2px] bg-slate-400 my-2"></div>

    <!-- body -->
    <div class="p-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showButtonDetails: {
    type: Boolean,
    default: false
  },
  showButtonDelete: {
    type: Boolean,
    default: false
  },
  showEditButton: {
    type: Boolean,
    default: false
  }
});

defineEmits<{
  (e: "deleteClicked", value: void): void;
  (e: "detailsClicked", value: void): void;
  (e: "editClicked", value: void): void;
}>();
</script>

<style scoped></style>
