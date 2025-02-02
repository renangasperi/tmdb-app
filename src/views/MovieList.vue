<template>
  <div
    class="w-full flex flex-col items-center gap-5 px-5 md:px-20 lg:px-36 py-10"
  >
    <h1 class="text-3xl text-black font-bold self-start">
      {{ titleByMovieType[movieType] }}
    </h1>
    <div class="w-full flex flex-wrap justify-center gap-5">
      <div
        v-for="movie in movieData?.results"
        class="relative w-40 h-fit cursor-pointer hover:brightness-75 hover:scale-95 transition-all"
        :key="movie.id"
        @click="$router.push(`/detail/${movie.id}`)"
      >
        <ImageWithLoader
          className="h-60 object-cover rounded-xl"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <p class="mt-3 text-lg font-semibold">{{ movie.title }}</p>

        <div class="absolute right-2 top-[226px]">
          <VoteBadge :vote-average="movie.vote_average" />
        </div>
      </div>
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
import { useMovies } from "../composables/useMovies";
import { useRoute } from "vue-router";
import ImageWithLoader from "../components/common/ImageWithLoader.vue";
import VoteBadge from "../components/common/VoteBadge.vue";
import type { MovieType } from "../types/movie.interface";
import { titleByMovieType } from "../constants/titleByMovieType";

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
