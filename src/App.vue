<template>
  <div class="app h-screen w-full bg-gray-100">
    <Header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
</script>
