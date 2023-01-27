<template>
  <div>
    <label v-if="label" for="email" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1">
      <input
          class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-700 focus:outline-none focus:ring-red-700 sm:text-sm"
          :id="id"
          :name="id"
          :type="type"
          :autocomplete="autocomplete"
          :required="required"
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
  id: String,
  placeholder: String,
  modelValue: String,
  required: Boolean,
  type: {
    type: String,
    default: 'text'
  },
  autocomplete: String
})
</script>

<style scoped>

</style>