import { ref } from "vue";
import { useApi } from "./useApi";
import type { PaginatedResponse } from "../types/api.interface";
import type { Movie, MovieDetail, MovieType } from "../types/movie.interface";

export function useMovies() {
  const { get: getList, error, loading } = useApi<PaginatedResponse<Movie>>();
  const { get: getDetails } = useApi<MovieDetail>();

  const path = "movie";

  const movieDetail = ref<MovieDetail | null>(null);
  const movieData = ref<PaginatedResponse<Movie> | null>(null);

  const formatListResponse = (response: PaginatedResponse<Movie> | null) => {
    if (!response) {
      return null;
    }

    return {
      ...response,
      results: response.results.map((movie) => ({
        ...movie,
        release_date: new Date(movie.release_date).toLocaleDateString("pt-BR"),
        vote_average: +movie.vote_average.toFixed(1) * 10,
      })),
    };
  };

  const getMovieById = async (id: number): Promise<void> => {
    const response = await getDetails(`${path}/${id}`);

    if (!response) return;

    movieDetail.value = {
      ...response,
      release_date: new Date(response.release_date).toLocaleDateString("pt-BR"),
      vote_average: +response.vote_average.toFixed(1) * 10,
    };
  };

  const getMovies = async (
    page: number = 1,
    type: MovieType
  ): Promise<void> => {
    const response = await getList(`${path}/${type}`, {
      page: page.toString(),
    });

    const data = formatListResponse(response);

    if (page > 1 && !!data) {
      movieData.value = {
        ...data,
        results: [...movieData.value!.results, ...data.results],
      };
      return;
    }

    movieData.value = data;
  };

  return {
    movieDetail,
    movieData,
    getMovies,
    error,
    loading,
    getMovieById,
  };
}
