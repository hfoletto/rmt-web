<template>
  <div class="px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28 space-y-24">
    <template v-if="!loading">
      <div v-for="(city, i) in result.cities.data" :key="i" class="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div class="flex">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {{ city.name }}
            <span class="ml-2 font-light text-gray-500">{{ city.state.uf }}</span>
          </h2>
        </div>
        <div class="mt-8 grid gap-12 pt-8 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-4">
          <div v-for="theater in city.theaters" :key="theater.name" class="bg-white flex flex-col rounded-lg shadow-lg p-5">
            <a href="#" class="block">
              <p class="text-xl font-semibold text-gray-900">{{ theater.name }}</p>
              <span class="text-base text-gray-500">{{ theater.address }}</span>
            </a>
            <div class="mt-6 space-y-4">
              <div v-for="auditorium in theater.auditoriums" :key="auditorium.name">
                <h4>{{ auditorium.name }} - {{ auditorium.ratings_count }} avaliações</h4>
                <div class="flex flex-wrap items-center space-x-1.5">
                  <div class="group relative">
                    <RatingChip data-tooltip-target="image_rating_tooltip" type="image" :value="auditorium.image_rating"/>
                    <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
                      Imagem - {{ auditorium.image_rating_count }} avaliações
                    </span>
                  </div>
                  <div class="group relative">
                    <RatingChip type="audio" :value="auditorium.audio_rating"/>
                    <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
                      Áudio - {{ auditorium.audio_rating_count }} avaliações
                    </span>
                  </div>
                  <div class="group relative">
                    <RatingChip type="comfort" :value="auditorium.comfort_rating"/>
                    <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
                      Conforto - {{ auditorium.comfort_rating_count }} avaliações
                    </span>
                  </div>
                  <div class="group relative">
                    <RatingChip type="bomboniere" :value="auditorium.bomboniere_rating"/>
                    <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
                      Bomboniere - {{ auditorium.bomboniere_rating_count }} avaliações
                    </span>
                  </div>
                  <div class="group relative">
                    <RatingChip type="experience" :value="auditorium.experience_rating"/>
                    <span class="px-3 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg shadow-sm whitespace-nowrap -translate-y-full -translate-x-1/2 -top-1 left-2/4 hidden group-hover:block absolute z-50">
                      Experiência - {{ auditorium.experience_rating_count }} avaliações
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="i in [0, 1]" :key="i" class="animate-pulse relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div class="flex">
          <h2 class="flex">
            <div class="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-52"></div>
            <div class="ml-2 h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
          </h2>
        </div>
        <div class="mt-8 grid gap-12 pt-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
          <div v-for="j in 6" :key="j" class="bg-white flex flex-col overflow-hidden rounded-lg shadow-lg p-6">
            <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
            <div class="h-7 mt-4 bg-gray-200 rounded-full dark:bg-gray-700 w-60"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { useHead } from '#imports'

useHead({
  bodyAttrs: {
    class: 'bg-gray-50',
  },
})

const query = gql`
  query getCitiesWithTheaters($first: Int!) {
    cities(first: $first) {
      data {
        name,
        state {
          name,
          uf
        }
        theaters {
          name
          address
          auditoriums_count
          auditoriums {
            name
            image_rating
            image_rating_count
            audio_rating
            audio_rating_count
            comfort_rating
            comfort_rating_count
            bomboniere_rating
            bomboniere_rating_count
            experience_rating
            experience_rating_count
            ratings_count
          }
        }
      }
    }
  }
`
const variables = { first: 10 }
const { result, loading } = useQuery(query, variables)
</script>
