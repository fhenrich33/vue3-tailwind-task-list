<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Button from "./Button.vue";
import Card from "./Card.vue";

const emits = defineEmits(["close"]);

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") emits("close");
};

onMounted(() => {
  window.addEventListener("keyup", handleEsc);
});

onUnmounted(() => {
  window.removeEventListener("keyup", handleEsc);
});
</script>

<template>
  <div
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
    role="none"
    aria-hidden="true"
  >
    <Card role="alertdialog" class="sm:min-w-[300px] w-[500px] mx-2 sm:mx-auto relative">
      <template #title>
        <slot name="title" />
      </template>

      <template #header>
        <button
          @click="$emit('close')"
          title="close"
          aria-label="Close"
          class="text-gray-300 text-4xl cursor-pointer absolute top-2 right-4"
        >
          ⨯
        </button>
      </template>

      <template #default>
        <slot />
      </template>

      <template #actions>
        <slot name="actions" />
      </template>
    </Card>
  </div>
</template>
