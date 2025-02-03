import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBar from "../../../../src/components/common/SearchBar.vue";
import { useDebounce } from "../../../../src/composables/useDebounce";
import { useSearchMovie } from "../../../../src/composables/useSearchMovie";

vi.mock("vue-router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../../../../src/composables/useSearchMovie", () => ({
  useSearchMovie: vi.fn(),
}));

vi.mock("../../../../src/composables/useDebounce", () => ({
  useDebounce: vi.fn(),
}));

describe("SearchBar.vue", () => {
  let wrapper: any;
  let routerMock: any;
  let searchMovieMock: any;
  let clearSearchListMock: any;
  let debouncedValueMock: any;
  let updateValueMock: any;

  beforeEach(() => {
    routerMock = {
      push: vi.fn(),
      currentRoute: ref({ path: "/" }),
    };
    searchMovieMock = vi.fn();
    clearSearchListMock = vi.fn();
    debouncedValueMock = ref("");
    updateValueMock = vi.fn();

    (useRouter as any).mockReturnValue(routerMock);
    (useSearchMovie as any).mockReturnValue({
      searchList: ref({ results: [] }),
      searchMovie: searchMovieMock,
      clearSearchList: clearSearchListMock,
      loading: ref(false),
    });
    (useDebounce as any).mockReturnValue({
      debouncedValue: debouncedValueMock,
      updateValue: updateValueMock,
    });

    wrapper = mount(SearchBar, {
      props: { isOpen: true },
      global: {
        mocks: {
          $router: routerMock,
        },
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("calls updateValue on input", async () => {
    const input = wrapper.find("input");
    await input.setValue("test");
    expect(updateValueMock).toHaveBeenCalledWith("test");
  });

  it("calls searchMovie on debouncedValue change", async () => {
    debouncedValueMock.value = "test";
    await wrapper.vm.$nextTick();
    expect(searchMovieMock).toHaveBeenCalledWith("test");
  });

  it("clears search list on empty debouncedValue", async () => {
    wrapper.vm.isOpen = true;
    wrapper.vm.debouncedValue = "Test";

    await wrapper.vm.$nextTick();

    wrapper.vm.debouncedValue = "";

    await wrapper.vm.$nextTick();

    expect(clearSearchListMock).toHaveBeenCalled();
  });

  it("emits closeSearch and navigates on movie click", async () => {
    const movie = { id: 1, title: "Test Movie" };
    wrapper.vm.searchList.results = [movie];
    wrapper.vm.isOpen = true;
    wrapper.vm.search = "Test";
    await wrapper.vm.$nextTick();

    const movieDiv = wrapper.find(".cursor-pointer");
    await movieDiv.trigger("click");

    expect(wrapper.emitted().closeSearch).toBeTruthy();
    expect(clearSearchListMock).toHaveBeenCalled();
    expect(routerMock.push).toHaveBeenCalledWith(`/detail/${movie.id}`);
  });

  it("emits closeSearch on route change", async () => {
    routerMock.currentRoute.value = { path: "/new-route" };
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().closeSearch).toBeTruthy();
  });
});
