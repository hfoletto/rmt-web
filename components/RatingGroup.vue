<template>
  <div class="flex flex-wrap items-center space-x-1.5">
    <div class="group relative">
      <RatingChip data-tooltip-target="imageRating_tooltip" type="image" :value="imageRating" />
      <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
        Imagem - {{ imageRatingCount }} avaliações
      </span>
    </div>
    <div class="group relative">
      <RatingChip type="audio" :value="audioRating" />
      <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
        Áudio - {{ audioRatingCount }} avaliações
      </span>
    </div>
    <div class="group relative">
      <RatingChip type="comfort" :value="comfortRating" />
      <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
        Conforto - {{ comfortRatingCount }} avaliações
      </span>
    </div>
    <div class="group relative">
      <RatingChip type="bomboniere" :value="bomboniereRating" />
      <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
        Bomboniere - {{ bomboniereRatingCount }} avaliações
      </span>
    </div>
    <div class="group relative">
      <RatingChip type="experience" :value="experienceRating" />
      <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
        Experiência - {{ experienceRatingCount }} avaliações
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageRating: Number,
  imageRatingCount: Number,
  audioRating: Number,
  audioRatingCount: Number,
  comfortRating: Number,
  comfortRatingCount: Number,
  bomboniereRating: Number,
  bomboniereRatingCount: Number,
  experienceRating: Number,
  experienceRatingCount: Number,
}>()
</script>
