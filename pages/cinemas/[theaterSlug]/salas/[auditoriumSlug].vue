<template>
  <div v-if="data?.theater?.auditoriums?.length">
    <h2>{{ data.theater.name }} - {{ data.theater.auditoriums[0].name }}</h2>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const query = gql`
  query getTheaterAuditorium($theaterSlug: String!, $auditoriumSlug: String!) {
    theater(slug: $theaterSlug) {
      name
      auditoriums(slug: $auditoriumSlug) {
        name,
        ratings_count
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
