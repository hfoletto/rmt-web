<template>
  <span v-if="!modelValue && readonly" class="font-semibold text-gray-400">Não avaliado</span>
  <div v-else class="relative">
    <transition
        enter-from-class="translate-x-full opacity-0"
        leave-to-class="translate-x-full opacity-0"
        enter-active-class="transition duration-150"
        leave-active-class="transition duration-150"
    >
      <button
        v-if="!readonly && modelValue"
        type="button"
        :class="`block absolute -left-${size-2} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none`"
        @click="update(undefined)"
      >
        <span class="sr-only">Remover avaliação</span>
        <XMarkIcon :class="`h-${size-2} w-${size-2}`" aria-hidden="true" />
      </button>
    </transition>
    <div :class="['flex items-center', `h-${size}`]">
      <button
          type="button"
          v-for="i in 5"
          :key="i"
          :class="[
        readonly ? 'cursor-default' : 'cursor-pointer',
      ]"
          @click="!readonly ? update(i) : undefined"
          @mouseenter="() => { hover = i }"
          @mouseleave="() => { hover = null }"
      >
        <svg
            aria-hidden="true"
            :class="[
          `w-${size} h-${size}`,
          (!readonly && hover !== null)
            ? (hover >= i ? 'text-gray-500' : 'text-gray-300')
            : (modelValue >= i ? 'text-yellow-400' : 'text-gray-300'),
        ]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

type SizeRange = 3|4|5|6|7|8|9|10|11|12|14|16

defineProps({
  modelValue: {
    type: Number,
    required: false,
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: Number as PropType<SizeRange>,
    required: false,
    default: 5,
  },
})
const emit = defineEmits(['update:modelValue'])

const hover = ref(null as number|null)

const update = function (value: number|undefined) {
  emit('update:modelValue', value)
  hover.value = null
}

</script>
