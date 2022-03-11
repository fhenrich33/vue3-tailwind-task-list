<script setup lang="ts">
interface Props {
  btnType?: "button" | "submit" | "reset" | undefined;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  btnType: "button",
  color: "gray",
});
</script>

<template>
  <button
    :type="btnType"
    class="inline-block px-6 py-2.5 mr-2 border font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
    :class="`text-${color}-600 border-${color}-600 hover:bg-${color}-200 focus:bg-${color}-200 active:bg-${color}-800`"
  >
    <slot />
  </button>
</template>
