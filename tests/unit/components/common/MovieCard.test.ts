import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import MovieCard from "../../../../src/components/common/MovieCard.vue";

const movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test.jpg",
  release_date: "2023-01-01",
  vote_average: 8.5,
};

describe("MovieCard.vue", () => {
  it("renders movie title", () => {
    const wrapper = mount(MovieCard, {
      props: { movie },
    });
    expect(wrapper.text()).toContain(movie.title);
  });

  it("renders movie release date", () => {
    const wrapper = mount(MovieCard, {
      props: { movie },
    });
    expect(wrapper.text()).toContain(movie.release_date);
  });

  it("renders movie poster", async () => {
    const wrapper = mount(MovieCard, {
      props: { movie },
    });

    await wrapper.find('img[loading="lazy"]').trigger("load");

    const img = wrapper.find("img");

    expect(img.attributes("src")).toBe(
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );
  });

  it("renders vote badge", () => {
    const wrapper = mount(MovieCard, {
      props: { movie },
    });
    const voteBadge = wrapper.findComponent({ name: "VoteBadge" });
    expect(voteBadge.exists()).toBe(true);
    expect(voteBadge.props("voteAverage")).toBe(movie.vote_average);
  });

  it("navigates to detail page on click", async () => {
    const push = vi.fn();
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: {
        mocks: {
          $router: { push },
        },
      },
    });
    await wrapper.trigger("click");
    expect(push).toHaveBeenCalledWith(`/detail/${movie.id}`);
  });
});
