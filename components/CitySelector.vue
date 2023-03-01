<template>
  <Combobox
    v-model="selectedCity"
    as="div"
    :by="compareCities"
    :model-value="modelValue"
    @update:modelValue="value => emit('update:modelValue', value)"
  >
    <ComboboxLabel class="block text-sm font-medium text-gray-700">{{ label }}</ComboboxLabel>
    <div class="relative mt-1">
      <ComboboxButton class="absolute inset-y-0 left-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <MapPinIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>
      <ComboboxInput
        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-8 pr-10 shadow-sm focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 sm:text-sm"
        :required="required"
        :display-value="(city) => city ? `${city.name} - ${city.state.uf}` : ''"
        @change="query = $event.target.value"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <div v-if="loading" class="absolute inset-y-0 right-7 p-1 flex items-center">
        <svg aria-hidden="true" class="inline w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#9ca3af" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
        </svg>
      </div>

      <ComboboxOptions v-if="result?.cities?.data?.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="city in result.cities.data" :key="city.name" v-slot="{ active, selected }" :value="city" as="template">
          <li :class="['relative cursor-pointer select-none py-2 pl-8 pr-4', active ? 'bg-gray-200' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ city.name }} - {{ city.state.uf }}
            </span>

            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-red-800">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon, MapPinIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

defineProps({
  modelValue: {
    type: Object,
    required: false,
  },
  label: {
    type: String,
    required: false,
    default: undefined,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const query = ref('')
const selectedCity = ref(null)

const citiesQuery = gql`
  query getCities($name: String!){
    cities(name: $name, first: 10) {
      data {
        id
        name
        slug
        state {
            name
            uf
        }
      }
    }
  }
`

const variables = computed(() => {
  return {
    name: `%${query.value}%`,
  }
},
)

const { result, loading } = useQuery(citiesQuery, variables, {
  debounce: 400,
})

function compareCities (
  a: { name: String, state: { name: String, uf: String } },
  b: { name: String, state: { name: String, uf: String } },
) {
  return ((a?.name === b?.name) && (a?.state?.uf === b?.state?.uf))
}

</script>
