<template>
  <div>
    <label v-if="label" for="email" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1">
      <input
        :id="id"
        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-700 focus:outline-none focus:ring-red-700 sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200"
        :name="id"
        :type="type"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :value="modelValue"
        :pattern="minlength ? `.{${minlength},}` : undefined"
        :title="minlength ? `Mínimo de ${minlength} caracteres` : undefined"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  id: String,
  placeholder: String,
  modelValue: String,
  disabled: Boolean,
  required: Boolean,
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: String,
  minlength: Number,
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
