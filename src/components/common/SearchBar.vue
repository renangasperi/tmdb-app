<template>
  <div
    class="absolute h-12 w-full flex items-center gap-4 bg-gray-100 left-0 -bottom-12 transition-all px-5 md:px-20 lg:px-36"
    :class="{ '!-bottom-0': !isOpen }"
  >
    <img src="../../assets/search-icon.svg" class="w-6 h-6 select-none" />

    <input
      type="text"
      class="w-full h-full bg-transparent focus:outline-none"
      placeholder="Busque por filmes"
      v-model="search"
      @input="onInput"
    />

    <img
      v-if="loading"
      src="../../assets/loader.svg"
      class="animate-spin h-6 w-6"
    />

    <div
      class="absolute top-12 left-0 bg-gray-100 w-full h-80 z-10 overflow-auto border-y border-gray-300"
      v-if="searchList?.results.length && isOpen && search"
    >
      <div
        v-for="movie in searchList.results"
        class="border-b border-gray-300 cursor-pointer py-2 px-5 md:px-20 lg:px-36 hover:bg-gray-200/50"
        @click="handleClick(movie)"
      >
        <p class="text-sm text-gray-800">{{ movie.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useSearchMovie } from "../../composables/useSearchMovie";
import { useDebounce } from "../../composables/useDebounce";
import { useRouter } from "vue-router";
import type { Movie } from "../../types/movie.interface";

const { isOpen } = defineProps<{
  isOpen: boolean;
}>();

const emits = defineEmits(["closeSearch"]);

const router = useRouter();
const search = ref("");
const { clearSearchList, searchList, searchMovie, loading } = useSearchMovie();
const { debouncedValue, updateValue } = useDebounce(search.value);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  updateValue(target.value);
};

const handleClick = (movie: Movie) => {
  emits("closeSearch");
  clearSearchList();
  search.value = "";
  router.push(`/detail/${movie.id}`);
};

watch(router?.currentRoute, () => {
  if (!isOpen) return;

  emits("closeSearch");
});

watch(debouncedValue, (newValue: string) => {
  if (!newValue) {
    clearSearchList();
    return;
  }

  searchMovie(newValue);
});
</script>
