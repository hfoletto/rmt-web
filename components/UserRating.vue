<template>
  <div class="py-12 md:flex">
    <div class="hidden md:block w-3/12 mr-2 mb-2 md:w-48 md:mr-8 md:mb-0">
      <img :src="movieWatchedPoster" class="w-full h-auto">
    </div>
    <div class="space-y-4 flex-1">
      <div class="flex items-center max-md:space-y-1 md:block md:text-xl">
        <div class="block w-3/12 mr-4 md:hidden">
          <img :src="movieWatchedPoster" class="w-full h-auto">
        </div>
        <div>
          <span class="max-md:block">
          <span class="font-medium">{{ userName }}</span> assistiu
        </span>
          <span class="max-md:block">
          <span class="font-bold text-red-800">{{ movieWatchedTitle }}</span> em
        </span>
          <span class="max-md:block font-light tracking-wide text-gray-500">
          {{ (new Intl.DateTimeFormat('pt-BR')).format((new Date(visitedAt))) }}
        </span>
        </div>
      </div>
      <div class="w-full hidden xl:flex justify-between">
        <div class="flex items-center">
          <span class="block">Imagem:</span>
          <StarRating class="ml-1" :model-value="imageRating" readonly />
        </div>
        <div class="flex items-center">
          <span class="block">Áudio:</span>
          <StarRating class="ml-1" :model-value="audioRating" readonly />
        </div>
        <div class="flex items-center">
          <span class="block">Conforto:</span>
          <StarRating class="ml-1" :model-value="comfortRating" readonly />
        </div>
        <div class="flex items-center">
          <span class="block">Bomboniere:</span>
          <StarRating class="ml-1" :model-value="bomboniereRating" readonly />
        </div>
        <div class="flex items-center">
          <span class="block">Experiência:</span>
          <StarRating class="ml-1" :model-value="experienceRating" readonly />
        </div>
      </div>
      <RatingGroup
        class="w-full justify-center space-x-3.5 xl:hidden"
        :image-rating="imageRating"
        :audio-rating="audioRating"
        :comfort-rating="comfortRating"
        :bomboniere-rating="bomboniereRating"
        :experience-rating="experienceRating"
      />
      <div v-if="review" class="text-base leading-7 text-gray-800 space-y-3" v-html="review" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageRating?: Number,
  audioRating?: Number,
  comfortRating?: Number,
  bomboniereRating?: Number,
  experienceRating?: Number,
  review?: Number,
  movieWatchedTitle: String,
  movieWatchedPoster: String,
  visitedAt: Number,
  userName: String,
}>()
</script>
