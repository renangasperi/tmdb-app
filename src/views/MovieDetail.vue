<template>
  <div
    class="w-full flex flex-col gap-5 px-5 md:px-20 lg:px-36 xl:px-44 2xl:px-80 py-10"
  >
    <div class="flex gap-10" v-if="movieDetail">
      <ImageWithLoader
        className="w-[300px] h-[450px] rounded-xl"
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

        <div class="flex gap-2">
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

    <ScrollableList v-if="movieCredits">
      <div
        v-for="castMember in movieCredits?.cast"
        class="relative w-40 h-fit max-h-[330px] overflow-hidden select-none hover:brightness-75 hover:scale-95 transition-all"
        :key="castMember.cast_id"
      >
        <ImageWithLoader
          className="h-60 object-cover rounded-xl"
          :src="`https://image.tmdb.org/t/p/w200${castMember.profile_path}`"
          :alt="castMember.name"
        />
        <p class="mt-3 text-lg font-semibold">{{ castMember.name }}</p>
        <p class="mt-1 text-sm text-gray-500 line-clamp-1">
          {{ castMember.character }}
        </p>
      </div>
    </ScrollableList>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMovieCredits } from "../composables/useMovieCredits";
import { useMovies } from "../composables/useMovies";
import ImageWithLoader from "../components/common/ImageWithLoader.vue";
import VoteBadge from "../components/common/VoteBadge.vue";
import ScrollableList from "../components/Home/ScrollableList.vue";

const router = useRouter();
const { movieDetail, getMovieById } = useMovies();
const { movieCredits, getMovieCredits } = useMovieCredits();

onMounted(() => {
  const { id: movieId } = router.currentRoute.value.params;

  getMovieById(+movieId);
  getMovieCredits(+movieId);
});
</script>
