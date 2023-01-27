<template>
  <div class="space-y-2">
    <Alert theme="error" v-for="(error, i) of error.graphQLErrors" :title="error.message">
      <ul v-if="error.extensions.validation" role="list" class="list-disc space-y-1 pl-5">
        <li v-for="(value, key) of error.extensions.validation" :key="key">
          {{ value.join(', ') }}
        </li>
      </ul>
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "@vue/runtime-core";
import { ApolloError } from "@apollo/client";
const props = defineProps({
  error: Object as PropType<ApolloError>,
})
</script>