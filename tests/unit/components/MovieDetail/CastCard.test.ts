import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CastCard from "../../../../src/components/MovieDetail/CastCard.vue";
import type { CastMember } from "../../../../src/types/credits.interface";

const castMemberWithProfile: CastMember = {
  cast_id: 1,
  name: "John Doe",
  character: "Hero",
  profile_path: "/path/to/profile.jpg",
};

const castMemberWithoutProfile: CastMember = {
  cast_id: 2,
  name: "Jane Doe",
  character: "Villain",
  profile_path: null,
};

describe("CastCard.vue", () => {
  it("renders cast member with profile image", async () => {
    const wrapper = mount(CastCard, {
      props: { castMember: castMemberWithProfile },
    });

    await wrapper.find('img[loading="lazy"]').trigger("load");

    expect(wrapper.find("img").exists()).toBe(true);
    expect(wrapper.find("img").attributes("src")).toContain(
      castMemberWithProfile.profile_path
    );
    expect(wrapper.find("p").text()).toContain(castMemberWithProfile.name);
    expect(wrapper.find("span").text()).toContain(
      castMemberWithProfile.character
    );
  });

  it("renders cast member without profile image", () => {
    const wrapper = mount(CastCard, {
      props: { castMember: castMemberWithoutProfile },
    });

    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.find("div.flex.text-white").text()).toBe("?");
    expect(wrapper.find("p").text()).toContain(castMemberWithoutProfile.name);
    expect(wrapper.find("span").text()).toContain(
      castMemberWithoutProfile.character
    );
  });
});
