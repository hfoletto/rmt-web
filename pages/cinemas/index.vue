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
          <div v-for="theater in city.theaters" :key="theater.name" class="bg-white flex flex-col overflow-hidden rounded-lg shadow-lg p-5">
            <div>
              <a href="#" class="inline-block">
                <span :class="['bg-red-100 text-red-900 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium']">{{ theater.auditoriums_count }} salas</span>
              </a>
            </div>
            <a href="#" class="mt-4 block">
              <p class="text-xl font-semibold text-gray-900">{{ theater.name }}</p>
            </a>
            <div class="mt-8 space-y-4">
              <div v-for="auditorium in theater.auditoriums" :key="auditorium.name">
                <h4>{{ auditorium.name }}</h4>
                <div class="flex flex-wrap items-center space-x-1.5">
                  <Chip><Icon :icon="panoramaSharp" class="text-gray-400 mr-1 w-auto h-5" /> {{ auditorium.image_rating?.toFixed(1) ?? ' ' }} </Chip>
                  <Chip><Icon :icon="speakerIcon" class="text-gray-400 mr-1 w-auto h-5" /> {{ auditorium.audio_rating?.toFixed(1) ?? ' ' }} </Chip>
                  <Chip><Icon :icon="eventSeat" class="text-gray-400 mr-1 w-auto h-5" /> {{ auditorium.comfort_rating?.toFixed(1) ?? ' ' }} </Chip>
                  <Chip><Icon :icon="storefrontIcon" class="text-gray-400 mr-1 w-auto h-5" /> {{ auditorium.bomboniere_rating?.toFixed(1) ?? ' ' }} </Chip>
                  <Chip><Icon :icon="magicButton" class="text-gray-400 mr-1 w-auto h-5" /> {{ auditorium.experience_rating?.toFixed(1) ?? ' ' }} </Chip>
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
import { Icon } from '@iconify/vue'
import panoramaSharp from '@iconify-icons/material-symbols/panorama-sharp'
import speakerIcon from '@iconify-icons/material-symbols/speaker'
import eventSeat from '@iconify-icons/material-symbols/event-seat'
import storefrontIcon from '@iconify-icons/material-symbols/storefront'
import magicButton from '@iconify-icons/material-symbols/magic-button'

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
          auditoriums_count
          auditoriums {
            name
            image_rating
            audio_rating
            comfort_rating
            bomboniere_rating
            experience_rating
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
