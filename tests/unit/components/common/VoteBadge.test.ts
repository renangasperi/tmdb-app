import { ref } from "vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import VoteBadge from "../../../../src/components/common/VoteBadge.vue";

const voteAverage = ref(0);

describe("VoteBadge.vue", () => {
  it("renders the correct vote average", () => {
    voteAverage.value = 85;
    const wrapper = mount(VoteBadge, {
      props: { voteAverage: voteAverage.value },
    });
    expect(wrapper.text()).toContain("85%");
  });

  it("applies the correct class for high vote average", () => {
    voteAverage.value = 85;
    const wrapper = mount(VoteBadge, {
      props: { voteAverage: voteAverage.value },
    });
    expect(wrapper.classes()).toContain("bg-green-500");
  });

  it("applies the correct class for medium vote average", () => {
    voteAverage.value = 60;
    const wrapper = mount(VoteBadge, {
      props: { voteAverage: voteAverage.value },
    });
    expect(wrapper.classes()).toContain("bg-yellow-500");
  });

  it("applies the correct class for low vote average", () => {
    voteAverage.value = 40;
    const wrapper = mount(VoteBadge, {
      props: { voteAverage: voteAverage.value },
    });
    expect(wrapper.classes()).toContain("bg-red-500");
  });
});
