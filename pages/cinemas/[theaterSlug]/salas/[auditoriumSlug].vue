<template>
  <div v-if="data?.theater?.auditoriums?.length">
    <div class="relative isolate overflow-hidden bg-gray-900 h-[calc(100vh_-_4rem)] bg-cover bg-center" :style="`background-image: url(${data.theater.auditoriums[0].featured_image.original_url})`">
      <div class="absolute -z-10 inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
      <div class="relative max-w-7xl h-full mx-6 lg:mx-auto">
        <div class="absolute top-1/2 -translate-y-1/2 lg:left-0 lg:right-1/2 lg:mx-8">
          <h2 class="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            {{ data.theater.auditoriums[0].name }}
            <span class="ml-2 font-light opacity-80">{{ data.theater.name }}</span>
          </h2>
          <p class="mt-6 text-lg leading-8 text-white opacity-80">{{ data.theater.auditoriums[0].description }}</p>
        </div>
      </div>
    </div>
    <div class="relative mx-auto max-w-lg lg:max-w-7xl px-6 pt-16 pb-20 lg:px-8 lg:py-12">
      <div class="border-y-2 py-2 px-4 border-gray-200 flex justify-between text-2xl">
        <h3 class="font-semibold text-gray-800">Todas as avaliações</h3>
        <h3 class="text-gray-500">mais recentes primeiro</h3>
      </div>
      <div class="divide-y-2 divide-gray-200">
        <UserRating v-for="(rating, i) in data.theater.auditoriums[0].ratings"
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
const route = useRoute()
const query = gql`
  query getTheaterAuditorium($theaterSlug: String!, $auditoriumSlug: String!) {
    theater(slug: $theaterSlug) {
      name
      auditoriums(slug: $auditoriumSlug) {
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
const variables = {
  theaterSlug: route.params.theaterSlug,
  auditoriumSlug: route.params.auditoriumSlug,
}
const { data } = await useAsyncQuery(query, variables)
if (!data.value?.theater?.auditoriums?.length)
  showError({ statusCode: 404, statusMessage: "Page Not Found" })

</script>
