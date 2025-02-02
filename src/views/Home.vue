<template>
  <div class="w-full flex flex-col gap-5 px-5 md:px-20 lg:px-36 py-10">
    <List
      v-for="movie in movieTypes"
      :movieType="movie"
      :title="titleByMovieType[movie]"
    />
  </div>
</template>

<script setup lang="ts">
import List from "../components/Home/List.vue";
import { titleByMovieType } from "../constants/titleByMovieType";

const movieTypes: Array<keyof typeof titleByMovieType> = [
  "now_playing",
  "popular",
  "top_rated",
  "upcoming",
];
</script>
