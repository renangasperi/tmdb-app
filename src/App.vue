<template>
  <div id="app" class="app min-h-screen w-full bg-slate-200">
    <Header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from "./components/common/Header.vue";
</script>
