<template>
  <div
    class="w-full flex flex-col gap-5 px-5 md:px-20 lg:px-36 xl:px-44 2xl:px-80 py-10"
  >
    <div
      class="flex flex-col md:flex-row gap-10 items-center md:items-start"
      v-if="movieDetail"
    >
      <ImageWithLoader
        className="max-w-[300px] h-[450px] w-full rounded-xl"
        :src="`https://image.tmdb.org/t/p/w300${movieDetail?.poster_path}`"
        :alt="movieDetail?.title"
      />
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-4xl">{{ movieDetail?.title }}</h1>

        <div class="flex gap-4">
          <VoteBadge :voteAverage="movieDetail?.vote_average" />
          <span>{{ movieDetail.vote_count }} votos</span>
        </div>

        <p class="font-medium">
          Data de lançamento: {{ movieDetail.release_date }}
        </p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="genre in movieDetail.genres"
            :key="genre.id"
            class="px-2 py-1 bg-gray-800 text-white rounded-lg"
            >{{ genre.name }}</span
          >
        </div>

        <p class="font-bold text-xl mt-4">Sinopse</p>
        <p class="text-gray-500">{{ movieDetail?.overview }}</p>
      </div>
    </div>

    <div v-if="loadingMovieDetail" class="w-full flex justify-center">
      <img src="../assets/loader.svg" class="w-14 h-14 animate-spin" />
    </div>

    <ScrollableList v-if="movieCredits">
      <CastCard
        v-for="castMember in movieCredits?.cast"
        :castMember="castMember"
        :key="castMember.cast_id"
      />
    </ScrollableList>

    <div v-if="loadingCredits" class="w-full flex justify-center">
      <img src="../assets/loader.svg" class="w-14 h-14 animate-spin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import ImageWithLoader from "../components/common/ImageWithLoader.vue";
import VoteBadge from "../components/common/VoteBadge.vue";
import ScrollableList from "../components/common/ScrollableList.vue";
import CastCard from "../components/MovieDetail/CastCard.vue";
import { useMovieCredits } from "../composables/useMovieCredits";
import { useMovies } from "../composables/useMovies";

const router = useRouter();
const { movieDetail, getMovieById, loading: loadingMovieDetail } = useMovies();
const {
  movieCredits,
  getMovieCredits,
  loading: loadingCredits,
} = useMovieCredits();

onMounted(() => {
  const { id: movieId } = router.currentRoute.value.params;

  getMovieById(+movieId);
  getMovieCredits(+movieId);
});
</script>
