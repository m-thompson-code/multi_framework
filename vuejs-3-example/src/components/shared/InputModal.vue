<template>
  <teleport to="#modal">
    <div
      v-show="prop.showModal"
      ref="modal"
      class="fixed inset-0 z-10 p-6 overflow-y-auto bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div class="p-4 min-w-[420px] max-w-[420px] bg-gray-400 rounded-lg mx-auto mt-[30%]">
        <textarea v-model="input" placeholder="type value ..." class="w-full" />

        <div class="flex items-center gap-3 mt-4">
          <button
            type="button"
            class="w-full p-2 text-center text-white bg-gray-600 rounded-lg"
            @click="$emit('cancelClicked')"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="w-full p-2 text-center text-white bg-green-600 rounded-lg"
            @click="$emit('confirmClicked', input)"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
const input = ref<string>("");

const prop = defineProps({
  showModal: {
    type: Boolean,
    required: false
  },
  inputValue: {
    type: String,
    required: false,
    default: ""
  }
});

watchEffect(() => {
  input.value = prop.inputValue;
});

defineEmits<{
  (e: "cancelClicked", value: void): void;
  (e: "confirmClicked", value: string): void;
}>();
</script>

<style scoped></style>
