<template>
  <teleport to="#modal">
    <transition
      enter-active-class="transition duration-300 ease-out transform "
      enter-from-class="scale-95 translate-y-10 opacity-0"
      enter-to-class="scale-100 translate-y-0 opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="scale-100 translate-y-0 opacity-100"
      leave-to-class="scale-95 translate-y-0 translate-y-10 opacity-0"
    >
      <div
        v-if="prop.showModal"
        ref="modal"
        class="fixed inset-0 z-10 p-6 overflow-y-auto bg-black bg-opacity-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div
          v-on-click-outside="() => $emit('cancelClicked')"
          class="p-4 min-w-[420px] max-w-[420px] bg-gray-400 rounded-lg mx-auto mt-[30%]"
        >
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
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

const input = ref<string>("");
const inputRef = ref<HTMLInputElement | null>(null);

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
