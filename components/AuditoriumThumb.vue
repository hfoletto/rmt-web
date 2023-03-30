<template>
  <NuxtLink
      :to="`/cinemas/${theaterSlug}/salas/${auditorium.slug}`"
      class="cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-2 pb-4 lg:px-4 aspect-video"
  >
    <img :src="auditorium.featured_image?.original_url" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30" />
    <div class="top-0 inset-x-0 absolute flex flex-wrap items-center justify-between p-4 text-white">
      <span class="text-xl font-bold opacity-95 lg:text-2xl">{{ auditorium.name }}</span>
      <span class="text-base opacity-80">{{ auditorium.ratings_count }} avaliações</span>
    </div>
    <RatingGroup
      class="justify-center opacity-95"
      contained
      :image-rating="auditorium.image_rating"
      :image-rating-count="auditorium.image_rating_count"
      :audio-rating="auditorium.audio_rating"
      :audio-rating-count="auditorium.audio_rating_count"
      :comfort-rating="auditorium.comfort_rating"
      :comfort-rating-count="auditorium.comfort_rating_count"
      :bomboniere-rating="auditorium.bomboniere_rating"
      :bomboniere-rating-count="auditorium.bomboniere_rating_count"
      :experience-rating="auditorium.experience_rating"
      :experience-rating-count="auditorium.experience_rating_count"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  auditorium: Object,
  theaterSlug: String,
}>()
</script>
