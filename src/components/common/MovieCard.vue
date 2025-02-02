<template>
  <div
    class="relative w-40 h-fit cursor-pointer hover:brightness-75 hover:scale-95 transition-all max-h-[330px] overflow-hidden"
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
</template>

<script setup lang="ts">
import type { Movie } from "../../types/movie.interface";
import ImageWithLoader from "./ImageWithLoader.vue";
import VoteBadge from "./VoteBadge.vue";

defineProps<{
  movie: Movie;
}>();
</script>
