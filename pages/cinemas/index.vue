<template>
  <div class="px-4 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28 space-y-24">
    <template v-if="!loading">
      <div class="relative mx-auto max-w-7xl">
        <div class="flex justify-between items-center border-b-2 border-gray-200 pb-8">
          <h2 class="hidden sm:block font-bold tracking-tight text-gray-900 text-4xl">
            {{ cityStore?.city?.name }}
            <span class="ml-2 font-light text-gray-500">{{ cityStore?.city?.state.uf }}</span>
          </h2>
          <CitySelector class="w-full sm:w-60" :model-value="cityStore?.city" @update:modelValue="updateCity" />
        </div>
        <div class="my-8 space-y-8">
          <div v-for="theater in result.theaters.data" :key="theater.name" class="bg-white flex flex-col rounded-lg shadow-lg p-3 md:p-6">
            <h3 class="block">
              <span class="block text-2xl font-semibold text-gray-900 lg:text-3xl">{{ theater.name }}</span>
              <span class="block text-lg text-gray-500">{{ theater.address }}</span>
            </h3>
            <div class="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-3">
              <AuditoriumThumb
                v-for="auditorium in theater.auditoriums"
                :key="auditorium.name"
                :auditorium="auditorium"
                :theater-slug="theater.slug"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="animate-pulse relative mx-auto max-w-7xl">
        <div class="flex pb-8 border-b-2 border-gray-200">
          <div class="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-52" />
          <div class="ml-2 h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-16" />
        </div>
        <div class="my-8 space-y-8">
          <div v-for="i in 4" :key="i" class="bg-white flex flex-col rounded-lg shadow-lg p-4 md:p-6">
            <div>
              <div class="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-60" />
              <div class="mt-2 h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-52" />
            </div>
            <div class="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-3">
              <div
                  v-for="j in 6"
                  :key="`${i}-${j}`"
                  class="overflow-hidden rounded-2xl bg-gray-200 px-2 pb-4 lg:px-4 aspect-video"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useHead } from '#imports'
import { City, useCityStore } from '~/store/city'

useHead({
  bodyAttrs: {
    class: 'bg-gray-50',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      href: '/favicon-96x96.png',
    },
  ],
})

const cityStore = useCityStore()

function updateCity (city: City) {
  cityStore.city = city
}

const query = gql`
  query getCitiesWithTheaters($city_id: ID!) {
    theaters(city_id: $city_id) {
      data {
        name
        slug
        address
        auditoriums_count
        auditoriums {
          name
          slug
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
          featured_image {
            original_url
          }
        }
      }
    }
  }
`

const variables = computed(() => {
  return {
    city_id: cityStore?.city?.id,
  }
})
const { result, loading, refetch } = useQuery(query, variables)

cityStore.$subscribe(() => {
  refetch()
})
</script>
