import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import List from "../../../../src/components/Home/List.vue";
import { useMovies } from "../../../../src/composables/useMovies";
import { ref } from "vue";

vi.mock("../../../../src/composables/useMovies", () => ({
  useMovies: vi.fn(),
}));

describe("List.vue", () => {
  let getMoviesMock: ReturnType<typeof vi.fn>;
  let movieDataMock: ReturnType<typeof ref>;
  let loadingMock: ReturnType<typeof ref>;
  let wrapper: any;

  beforeEach(() => {
    getMoviesMock = vi.fn();
    movieDataMock = ref({
      results: [
        { id: 1, title: "Filme 1" },
        { id: 2, title: "Filme 2" },
      ],
    });
    loadingMock = ref(false);

    (useMovies as any).mockReturnValue({
      movieData: movieDataMock,
      getMovies: getMoviesMock,
      loading: loadingMock,
    });

    wrapper = mount(List, {
      props: {
        title: "Os Mais Populares",
        movieType: "popular",
      },
    });
  });

  it("renders the title correctly", () => {
    expect(wrapper.find("h2").text()).toBe("Os Mais Populares");
  });

  it("renders movie cards when movieData is available", async () => {
    await wrapper.vm.$nextTick();
    const movieCards = wrapper.findAllComponents({ name: "MovieCard" });
    expect(movieCards).toHaveLength(2);
  });

  it("renders loading placeholders when loading is true", async () => {
    loadingMock.value = true;
    movieDataMock.value = null;
    await wrapper.vm.$nextTick();
    const placeholders = wrapper.findAll(".animate-pulse");
    expect(placeholders).toHaveLength(10);
  });

  it("renders error message when movieData is null and loading is false", async () => {
    movieDataMock.value = null;
    await wrapper.vm.$nextTick();
    expect(wrapper.find("p").text()).toBe(
      "Não foi possível carregar os filmes"
    );
  });
});
