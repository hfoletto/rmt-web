<template>
  <h2>{{ JSON.stringify(data.me.email) }}</h2>
</template>

<script lang="ts" setup>
const query = gql`
  query getMe {
  me {
    email,
    name,
    created_at
  }
}
`
const { data } = await useAsyncQuery(query)
</script>
