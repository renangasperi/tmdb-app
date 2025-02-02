import { ref } from "vue";
import { useApi } from "./useApi";
import type { Movie } from "../types/movie.interface";
import type { PaginatedResponse } from "../types/api.interface";

export function useSearchMovie() {
  const { get, loading } = useApi<PaginatedResponse<Movie>>();
  const path = "search/movie";

  const searchList = ref<PaginatedResponse<Movie> | null>(null);

  const searchMovie = async (query: string): Promise<void> => {
    const response = await get(path, { query });

    searchList.value = response;
  };

  const clearSearchList = () => {
    searchList.value = null;
  };

  return {
    searchList,
    searchMovie,
    clearSearchList,
    loading,
  };
}
