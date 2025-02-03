import { describe, it, expect, vi } from "vitest";
import { ref } from "vue";
import { useMovies } from "../../../src/composables/useMovies";
import { useApi } from "../../../src/composables/useApi";
import type {
  Movie,
  MovieDetail,
  MovieType,
} from "../../../src/types/movie.interface";
import { PaginatedResponse } from "../../../src/types/api.interface";

vi.mock("../../../src/composables/useApi");

describe("useMovies", () => {
  it("should fetch and format movie list", async () => {
    const mockMovies: PaginatedResponse<Movie> = {
      page: 1,
      results: [
        {
          id: 1,
          title: "Movie 1",
          release_date: "2023-02-02",
          vote_average: 7.5,
          poster_path: "path",
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    const getList = vi.fn().mockResolvedValue(mockMovies);
    (useApi as any).mockReturnValue({
      get: getList,
      error: ref(null),
      loading: ref(false),
    });

    const { getMovies, movieData } = useMovies();
    await getMovies(1, "popular" as MovieType);

    expect(getList).toHaveBeenCalledWith("movie/popular", { page: "1" });
    expect(movieData.value).toEqual({
      ...mockMovies,
      results: [
        {
          ...mockMovies.results[0],
          release_date: "02/02/2023",
          vote_average: 75,
        },
      ],
    });
  });

  it("should fetch and format movie details", async () => {
    const mockMovieDetail: MovieDetail = {
      id: 1,
      title: "Movie 1",
      release_date: "2023-02-02",
      vote_average: 7.5,
      overview: "Overview",
      genres: [],
      popularity: 1,
      poster_path: "path",
      vote_count: 1,
    };

    const getDetails = vi.fn().mockResolvedValue(mockMovieDetail);
    (useApi as any).mockReturnValue({
      get: getDetails,
      error: ref(null),
      loading: ref(false),
    });

    const { getMovieById, movieDetail } = useMovies();
    await getMovieById(1);

    expect(getDetails).toHaveBeenCalledWith("movie/1");
    expect(movieDetail.value).toEqual({
      ...mockMovieDetail,
      release_date: "02/02/2023",
      vote_average: 75,
    });
  });

  it("should handle null response for movie list", async () => {
    const getList = vi.fn().mockResolvedValue(null);
    (useApi as any).mockReturnValue({
      get: getList,
      error: ref(null),
      loading: ref(false),
    });

    const { getMovies, movieData } = useMovies();
    await getMovies(1, "popular" as MovieType);

    expect(getList).toHaveBeenCalledWith("movie/popular", { page: "1" });
    expect(movieData.value).toBeNull();
  });

  it("should handle null response for movie details", async () => {
    const getDetails = vi.fn().mockResolvedValue(null);
    (useApi as any).mockReturnValue({
      get: getDetails,
      error: ref(null),
      loading: ref(false),
    });

    const { getMovieById, movieDetail } = useMovies();
    await getMovieById(1);

    expect(getDetails).toHaveBeenCalledWith("movie/1");
    expect(movieDetail.value).toBeNull();
  });
});
