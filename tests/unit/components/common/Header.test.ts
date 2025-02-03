import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../../../../src/components/common/Header.vue";
import SearchBar from "../../../../src/components/common/SearchBar.vue";

describe("Header.vue", () => {
  let pushMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    pushMock = vi.fn();
  });

  it("renders the header component", () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $router: { push: pushMock },
        },
      },
    });

    expect(wrapper.find("h1").text()).toBe("TMDB");
  });

  it("navigates to home on title click", async () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $router: { push: pushMock },
        },
      },
    });

    await wrapper.find("h1").trigger("click");

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("toggles search bar visibility on button click", async () => {
    const wrapper = mount(Header);
    const button = wrapper.find("button");

    expect(wrapper.findComponent(SearchBar).props("isOpen")).toBe(false);

    await button.trigger("click");
    expect(wrapper.findComponent(SearchBar).props("isOpen")).toBe(true);

    await button.trigger("click");
    expect(wrapper.findComponent(SearchBar).props("isOpen")).toBe(false);
  });
});
