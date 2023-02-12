<template>
  <div class="py-12 flex">
    <div class="mr-8">
      <img :src="movieWatchedPoster" class="w-48 h-auto"/>
    </div>
    <div class="space-y-4 flex-1">
      <div class="text-xl">
        <span class="font-medium">{{ userName }}</span> assistiu
        <span class="font-bold text-red-800">{{ movieWatchedTitle }}</span> em
        <span class="font-light text-gray-500">{{ visitedAt }}</span>
      </div>
      <div class="w-full flex justify-between">
        <div class="flex items-center">
          <span class="block">Imagem:</span>
          <StarRating class="ml-1" :rating="imageRating"/>
        </div>
        <div class="flex items-center">
          <span class="block">Áudio:</span>
          <StarRating class="ml-1" :rating="audioRating"/>
        </div>
        <div class="flex items-center">
          <span class="block">Conforto:</span>
          <StarRating class="ml-1" :rating="comfortRating"/>
        </div>
        <div class="flex items-center">
          <span class="block">Bomboniere:</span>
          <StarRating class="ml-1" :rating="bomboniereRating"/>
        </div>
        <div class="flex items-center">
          <span class="block">Experiência:</span>
          <StarRating class="ml-1" :rating="experienceRating"/>
        </div>
      </div>
      <div v-if="review" class="text-base leading-7 text-gray-800 space-y-3" v-html="review">
      </div>
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
