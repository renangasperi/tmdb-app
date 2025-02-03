import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ImageWithLoader from "../../../../src/components/common/ImageWithLoader.vue";

describe("ImageWithLoader.vue", () => {
  it("renders loader initially", () => {
    const wrapper = mount(ImageWithLoader, {
      props: {
        src: "https://via.placeholder.com/150",
        alt: "Test Image",
        className: "test-class",
      },
    });
    expect(wrapper.find("img.animate-spin").exists()).toBe(true);
  });

  it("hides loader after image is loaded", async () => {
    const wrapper = mount(ImageWithLoader, {
      props: {
        src: "https://via.placeholder.com/150",
        alt: "Test Image",
        className: "test-class",
      },
    });
    await wrapper.find('img[loading="lazy"]').trigger("load");
    expect(wrapper.find("img.animate-spin").exists()).toBe(false);
    expect(wrapper.find('img[loading="lazy"]').isVisible()).toBe(true);
  });

  it("passes correct props to image", () => {
    const wrapper = mount(ImageWithLoader, {
      props: {
        src: "https://via.placeholder.com/150",
        alt: "Test Image",
        className: "test-class",
      },
    });
    const img = wrapper.find('img[loading="lazy"]');
    expect(img.attributes("src")).toBe("https://via.placeholder.com/150");
    expect(img.attributes("alt")).toBe("Test Image");
    expect(img.classes()).toContain("test-class");
  });

  it("applies correct class when loading", () => {
    const wrapper = mount(ImageWithLoader, {
      props: {
        src: "https://via.placeholder.com/150",
        alt: "Test Image",
        className: "test-class",
      },
    });
    expect(
      wrapper
        .find("div.flex.items-center.justify-center.bg-gray-300.w-full")
        .exists()
    ).toBe(true);
  });

  it("removes loading class after image is loaded", async () => {
    const wrapper = mount(ImageWithLoader, {
      props: {
        src: "https://via.placeholder.com/150",
        alt: "Test Image",
        className: "test-class",
      },
    });
    await wrapper.find('img[loading="lazy"]').trigger("load");
    expect(
      wrapper
        .find("div.flex.items-center.justify-center.bg-gray-300.w-full")
        .exists()
    ).toBe(false);
  });

  it("renders image with correct alt text", () => {
    const wrapper = mount(ImageWithLoader, {
      props: {
        src: "https://via.placeholder.com/150",
        alt: "Test Image",
        className: "test-class",
      },
    });
    const img = wrapper.find('img[loading="lazy"]');
    expect(img.attributes("alt")).toBe("Test Image");
  });

  it("renders image with correct src", () => {
    const wrapper = mount(ImageWithLoader, {
      props: {
        src: "https://via.placeholder.com/150",
        alt: "Test Image",
        className: "test-class",
      },
    });
    const img = wrapper.find('img[loading="lazy"]');
    expect(img.attributes("src")).toBe("https://via.placeholder.com/150");
  });
});
