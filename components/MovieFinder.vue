<template>
  <Combobox
    v-model="selectedMovie"
    as="div"
    by="tmdb_id"
    :modelValue="modelValue"
    @update:modelValue="value => emit('update:modelValue', value.tmdb_id)"
  >
    <ComboboxLabel class="block text-sm font-medium text-gray-700">Filme</ComboboxLabel>
    <span v-if="loading">Carregando...</span>
    <div class="relative mt-1">
      <ComboboxInput
        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 sm:text-sm"
        :display-value="(movie) => movie?.title"
        @change="query = $event.target.value"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions v-if="result?.searchMovies?.length >= 1" class="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="movie in result.searchMovies" :key="movie.tmdb_id" v-slot="{ active, selected }" :value="movie" as="template">
          <li :class="['relative cursor-pointer select-none py-2 pl-3 pr-9', active ? 'bg-gray-200' : 'text-gray-900']">
            <div class="flex items-center h-12">
              <div class="h-12 w-9 flex-shrink-0 bg-cover bg-center" :style="`background-image: url(${movie.tmdb_post_path})`" />
              <div class="ml-4">
                <div :class="['truncate', selected && 'font-semibold']">
                  {{ movie.title }}
                </div>
                <div :class="['truncate opacity-60']">
                  {{ (new Intl.DateTimeFormat('default', { year: "numeric" })).format((new Date(movie.release_date))) }}
                </div>
              </div>
            </div>
            <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-red-800']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

defineProps<{
  modelValue?: Number,
}>()
const emit = defineEmits(['update:modelValue'])

const query = ref('')
const selectedMovie = ref(null)

const moviesQuery = gql`
  query searchMovies($query: String!) {
    searchMovies(query: $query) {
      tmdb_id
      title
      release_date
      tmdb_post_path
    }
  }
`

const { result, loading } = useQuery(moviesQuery, { query }, {
  debounce: 400,
})
</script>
