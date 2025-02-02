<template>
  <div
    class="w-full flex flex-col items-center gap-5 px-5 md:px-20 lg:px-36 py-10"
  >
    <h1 class="text-3xl text-black font-bold self-start">
      {{ titleByMovieType[movieType] }}
    </h1>
    <div class="w-full flex flex-wrap justify-center gap-5">
      <MovieCard
        v-for="movie in movieData?.results"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <button
      class="max-w-80 w-full flex justify-center p-2 rounded-lg text-white font-bold bg-blue-600 cursor-pointer hover:bg-blue-700 hover:scale-95 transition-all"
      @click="loadMoreMovies"
    >
      <img
        src="../assets/loader.svg"
        v-if="!!loading"
        class="w-5 h-5 mr-2 animate-spin"
      />
      Ver mais
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import MovieCard from "../components/common/MovieCard.vue";
import { useMovies } from "../composables/useMovies";
import { titleByMovieType } from "../constants/titleByMovieType";
import type { MovieType } from "../types/movie.interface";

const { path } = useRoute();
const movieType = path.slice(1) as MovieType;

const { movieData, getMovies, loading } = useMovies();

const loadMoreMovies = () => {
  if (!movieData.value) return;
  getMovies(movieData.value.page + 1, movieType);
};

onMounted(() => {
  getMovies(1, movieType);
});
</script>
