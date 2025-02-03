<template>
  <div
    class="relative w-40 h-fit max-h-[330px] overflow-hidden select-none hover:brightness-75 hover:scale-95 transition-all"
  >
    <ImageWithLoader
      v-if="castMember?.profile_path"
      className="h-60 object-cover rounded-xl"
      :src="`https://image.tmdb.org/t/p/w200${castMember?.profile_path}`"
      :alt="castMember.name"
    />
    <div
      v-if="!castMember?.profile_path"
      class="h-60 flex items-center justify-center bg-gray-800 text-white text-6xl rounded-xl"
    >
      ?
    </div>

    <p class="mt-3 text-lg font-semibold">{{ castMember?.name }}</p>
    <span class="mt-1 text-sm text-gray-500 line-clamspan-1">
      {{ castMember?.character }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { CastMember } from "../../types/credits.interface";
import ImageWithLoader from "../common/ImageWithLoader.vue";

defineProps<{
  castMember: CastMember;
}>();
</script>
