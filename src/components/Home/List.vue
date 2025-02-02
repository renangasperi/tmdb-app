<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">{{ title }}</h2>

      <button
        class="text-lg font-semibold text-blue-500 px-2 rounded-lg cursor-pointer hover:bg-gray-200"
        @click="$router.push(movieType)"
      >
        Ver todos
      </button>
    </div>

    <ScrollableList v-if="!!movieData">
      <MovieCard
        v-for="movie in movieData?.results"
        :movie="movie"
        :key="movie.id"
      />

      <div
        class="w-40 h-60 relative rounded-xl flex items-center justify-center cursor-pointer text-black/60 hover:text-black hover:bg-gray-200 transition-all"
        @click="$router.push(movieType)"
      >
        <p class="text-xl font-medium text-center">Ir para a categoria</p>
      </div>
    </ScrollableList>

    <ScrollableList v-if="!!loading">
      <div
        class="w-40 h-60 bg-gray-400/60 rounded-xl animate-pulse"
        v-for="n in 10"
        :key="n"
      />
    </ScrollableList>

    <div v-if="!movieData && !loading">
      <p class="text-lg font-medium text-gray-500">
        Não foi possível carregar os filmes
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovies } from "../../composables/useMovies";
import type { MovieType } from "../../types/movie.interface";
import MovieCard from "../common/MovieCard.vue";
import ScrollableList from "./ScrollableList.vue";

const { movieType, title } = defineProps<{
  movieType: MovieType;
  title: string;
}>();

const { movieData, getMovies, loading } = useMovies();

onMounted(() => {
  getMovies(1, movieType);
});
</script>
