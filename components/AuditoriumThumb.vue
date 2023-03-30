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
    <div class="flex flex-wrap items-center justify-center space-x-1.5 opacity-95">
      <div class="group relative">
        <RatingChip data-tooltip-target="image_rating_tooltip" type="image" :value="auditorium.image_rating" />
        <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
          Imagem - {{ auditorium.image_rating_count }} avaliações
        </span>
      </div>
      <div class="group relative">
        <RatingChip type="audio" :value="auditorium.audio_rating" />
        <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
          Áudio - {{ auditorium.audio_rating_count }} avaliações
        </span>
      </div>
      <div class="group relative">
        <RatingChip type="comfort" :value="auditorium.comfort_rating" />
        <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
          Conforto - {{ auditorium.comfort_rating_count }} avaliações
        </span>
      </div>
      <div class="group relative">
        <RatingChip type="bomboniere" :value="auditorium.bomboniere_rating" />
        <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
                      Bomboniere - {{ auditorium.bomboniere_rating_count }} avaliações
                    </span>
      </div>
      <div class="group relative">
        <RatingChip type="experience" :value="auditorium.experience_rating" />
        <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
          Experiência - {{ auditorium.experience_rating_count }} avaliações
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  auditorium: Object,
  theaterSlug: String,
}>()
</script>
