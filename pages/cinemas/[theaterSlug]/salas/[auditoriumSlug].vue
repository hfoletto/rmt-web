<template>
  <div>
    <div v-if="data?.theater?.auditoriums?.length" class="relative mx-auto max-w-lg lg:max-w-7xl px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {{ data.theater.auditoriums[0].name }}
        <span class="ml-2 font-light text-gray-500">{{ data.theater.name }}</span>
      </h2>
      <div class="mt-8 divide-y-2 divide-gray-200">
        <UserRating v-for="(rating, i) in data.theater.auditoriums[0].ratings"
          :key="i"
          :image-rating="rating.image_rating"
          :audio-rating="rating.audio_rating"
          :comfort-rating="rating.comfort_rating"
          :bomboniere-rating="rating.bomboniere_rating"
          :experience-rating="rating.experience_rating"
          :review="rating.review"
          :movie-watched="rating.movie_watched"
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
        ratings_count
        ratings {
          image_rating
          audio_rating
          comfort_rating
          bomboniere_rating
          experience_rating
          review
          movie_watched
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
