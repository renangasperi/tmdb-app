<template>
  <div
    v-if="isLoading"
    :class="className"
    class="flex items-center justify-center bg-gray-300"
  >
    <img src="../../assets/loader.svg" class="animate-spin" />
  </div>

  <img
    loading="lazy"
    :class="className"
    :src="src"
    :alt="alt"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const { src, alt, className } = defineProps<{
  src: string;
  alt: string;
  className: string;
}>();

const isLoading = ref(true);

const handleLoad = () => {
  isLoading.value = false;
};
</script>
