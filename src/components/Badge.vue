<script setup lang="ts">
interface Props {
  color?: string;
}

withDefaults(defineProps<Props>(), {
  color: "gray",
});
</script>

<template>
  <span
    class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded"
    :class="`bg-${color}-500`"
    ><slot
  /></span>
</template>
