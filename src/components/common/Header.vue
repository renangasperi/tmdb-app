<template>
  <div
    class="bg-indigo-950 h-20 w-full flex items-center justify-between px-5 md:px-20 lg:px-36"
  >
    <h1
      class="text-cyan-400 text-4xl font-bold cursor-pointer"
      @click="$router.push('/')"
    >
      TMDB
    </h1>
    <button
      class="h-10 w-10 p-1.5 rounded-full cursor-pointer hover:bg-white/10 active:bg-white/15"
    >
      <img src="../../assets/search-icon.svg" />
    </button>
  </div>
</template>

<script setup lang="ts"></script>
