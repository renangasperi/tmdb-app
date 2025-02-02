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

    <ScrollableList v-if="movieData">
      <div
        v-for="movie in movieData?.results"
        class="relative w-40 h-fit cursor-pointer hover:brightness-75 hover:scale-95 transition-all max-h-[330px] overflow-hidden"
        :key="movie.id"
        :title="movie.title"
        @click="$router.push(`/detail/${movie.id}`)"
      >
        <ImageWithLoader
          className="h-60 object-cover rounded-xl"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <p class="mt-3 text-lg font-semibold line-clamp-2">{{ movie.title }}</p>
        <p class="mt-1 text-sm text-gray-500 line-clamp-1">
          {{ movie.release_date }}
        </p>

        <div class="absolute right-2 top-[226px]">
          <VoteBadge :vote-average="movie.vote_average" />
        </div>
      </div>

      <div
        class="w-40 h-60 relative rounded-xl flex items-center justify-center cursor-pointer text-black/60 hover:text-black hover:bg-gray-200 transition-all"
      >
        <p class="text-xl font-medium text-center">Ir para a categoria</p>
      </div>
    </ScrollableList>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovies } from "../../composables/useMovies";
import type { MovieType } from "../../types/movie.interface";
import ImageWithLoader from "../common/ImageWithLoader.vue";
import VoteBadge from "../common/VoteBadge.vue";
import ScrollableList from "./ScrollableList.vue";

const { movieType, title } = defineProps<{
  movieType: MovieType;
  title: string;
}>();

const { movieData, getMovies } = useMovies();

onMounted(() => {
  getMovies(1, movieType);
});
</script>
