<template>
  <div class="relative overflow-hidden" :class="className">
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-gray-300"
    >
      <img src="../../assets/loader.svg" class="animate-spin" />
    </div>

    <img
      loading="lazy"
      class="transition-opacity duration-500"
      :class="[className, { 'opacity-0': isLoading }]"
      :src="src"
      :alt="alt"
      @load="handleLoad"
    />
  </div>
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
