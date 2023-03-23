<template>
  <div>
    <div class="relative isolate overflow-hidden bg-gray-900 h-[calc(100vh_-_4rem)]">
      <transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          enter-active-class="transition ease-in-out delay-100 duration-700"
          leave-active-class="transition duration-500"
      >
        <div
            v-if="!loading && result?.theater?.auditoriums?.length"
            class="absolute -z-10 inset-0 bg-cover bg-center"
            :style="`background-image: url(${result.theater.auditoriums[0].featured_image.original_url})`"
        />
      </transition>
      <div class="absolute -z-10 inset-0 bg-gradient-to-r from-black to-transparent opacity-70" />
      <div v-if="!loading" class="relative max-w-7xl h-full mx-6 lg:mx-auto">
        <div class="absolute top-1/2 -translate-y-1/2 lg:left-0 lg:right-1/2 lg:mx-8">
          <h2 class="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            {{ result.theater.auditoriums[0].name }}
            <span class="ml-2 font-light opacity-80">{{ result.theater.name }}</span>
          </h2>
          <p class="mt-6 text-lg leading-8 text-white opacity-80">{{ result.theater.auditoriums[0].description }}</p>
        </div>
      </div>
      <div v-else class="relative max-w-7xl h-full mx-6 lg:mx-auto">
        <div class="animate-pulse absolute top-1/2 -translate-y-1/2 lg:left-0 lg:right-1/2 lg:mx-8">
          <div>
            <div class="flex">
              <div class="h-11 bg-gray-200 rounded-full dark:bg-gray-700 w-48" />
              <div class="ml-2 h-11 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
            </div>
            <div class="mt-4 h-11 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
          </div>
          <div class="mt-4">
            <template v-for="i in 5" :key="i">
              <div class="inline-block mr-2 mt-1.5 h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-12" />
              <div class="inline-block mr-2 mt-1.5 h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-20" />
              <div class="inline-block mr-2 mt-1.5 h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10" />
              <div class="inline-block mr-2 mt-1.5 h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-24" />
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loading && result?.theater?.auditoriums?.length" class="relative mx-auto max-w-lg lg:max-w-7xl px-6 pt-16 pb-20 lg:px-8 lg:py-12">
      <div class="border-y-2 py-2 px-4 border-gray-200 flex justify-between text-2xl">
        <h3 class="font-semibold text-gray-800">Todas as avaliações</h3>
        <h3 class="text-gray-500">mais recentes primeiro</h3>
      </div>
      <Button v-if="authStore.loggedIn" @click="create_rating_modal = true">Avaliar</Button>
      <CreateRating
          v-if="create_rating_modal"
          class="p-8"
          :auditorium-id="result.theater.auditoriums[0].id"
          :auditorium-name="result.theater.auditoriums[0].name"
          :theater-name="result.theater.name"
          :destroyed="() => create_rating_modal = false"
          @rating-created="ratingCreated"
      />
      <div class="divide-y-2 divide-gray-200">
        <UserRating
          v-for="(rating, i) in result.theater.auditoriums[0].ratings"
          :key="i"
          :image-rating="rating.image_rating"
          :audio-rating="rating.audio_rating"
          :comfort-rating="rating.comfort_rating"
          :bomboniere-rating="rating.bomboniere_rating"
          :experience-rating="rating.experience_rating"
          :review="rating.review"
          :movie-watched-title="rating.movie_watched.title"
          :movie-watched-poster="rating.movie_watched.poster_url"
          :visited-at="rating.visited_at"
          :user-name="rating.user.name"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'

const create_rating_modal = ref(false as boolean)

const route = useRoute()

const authStore = useAuthStore()

const query = gql`
  query getTheaterAuditorium($theaterSlug: String!, $auditoriumSlug: String!) {
    theater(slug: $theaterSlug) {
      name
      auditoriums(slug: $auditoriumSlug) {
        id
        name
        description
        ratings_count
        featured_image {
          original_url
        }
        ratings {
          image_rating
          audio_rating
          comfort_rating
          bomboniere_rating
          experience_rating
          review
          movie_watched {
            title
            poster_url
          }
          visited_at
          user {
            name
          }
        }
      }
    }
  }
`

const { result, loading, refetch, onResult } = await useQuery(query, {
  theaterSlug: route.params.theaterSlug,
  auditoriumSlug: route.params.auditoriumSlug,
})

onResult((queryResult) => {
  console.log(queryResult.data)
  if (!queryResult.data?.theater?.auditoriums?.length)
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
})

const ratingCreated = function () {
  create_rating_modal.value = false
  refetch()
}

</script>
