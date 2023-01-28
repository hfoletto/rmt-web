<template>
  <div class="space-y-2">
    <Alert v-for="(single_error, i) of error.graphQLErrors" :key="i" theme="error" :title="single_error.message">
      <ul v-if="single_error.extensions.validation" role="list" class="list-disc space-y-1 pl-5">
        <li v-for="(value, key) of single_error.extensions.validation" :key="key">
          {{ value.join(', ') }}
        </li>
      </ul>
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { ApolloError } from '@apollo/client'
defineProps<{
  error: ApolloError
}>()
</script>
