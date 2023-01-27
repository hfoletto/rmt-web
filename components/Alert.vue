<template>
  <div :class="`rounded-md ${ theme_info.background_color } p-4`">
    <div class="flex">
      <div class="flex-shrink-0">
        <Component :is="theme_info.icon" :class="`h-5 w-5 ${ theme_info.icon_color }`" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 :class="`text-sm font-medium ${ theme_info.header_color }`">{{ title }}</h3>
        <div v-if="hasSlot('default')" :class="`mt-2 text-sm ${ theme_info.body_color }`">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XCircleIcon, ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/20/solid'
import { PropType } from "@vue/runtime-core";
import useHasSlot from "@/composables/useHasSlot";
import {FunctionalComponent} from "vue";

type Theme = "error" | "warning" | "success" | "info"

interface ThemeInfo {
  header_color: string
  body_color: string
  background_color: string
  icon: FunctionalComponent
  icon_color: string
}

const props = defineProps({
  title: {
    type: String as PropType<string>,
    required: true,
  },
  theme: {
    type: String as PropType<Theme>,
    required: true,
  }
})

const themes: Record<Theme, ThemeInfo> = {
  "error": {
    header_color: 'text-red-800',
    body_color: 'text-red-700',
    background_color: 'bg-red-50',
    icon: XCircleIcon,
    icon_color: 'text-red-400',
  },
  "warning": {
    header_color: 'text-yellow-800',
    body_color: 'text-yellow-700',
    background_color: 'bg-yellow-50',
    icon: ExclamationTriangleIcon,
    icon_color: 'text-yellow-400',
  },
  "success": {
    header_color: 'text-green-800',
    body_color: 'text-green-700',
    background_color: 'bg-green-50',
    icon: CheckCircleIcon,
    icon_color: 'text-green-400',
  },
  "info": {
    header_color: 'text-blue-800',
    body_color: 'text-blue-700',
    background_color: 'bg-blue-50',
    icon: InformationCircleIcon,
    icon_color: 'text-blue-400',
  },
};

const theme_info = themes[props.theme]
const hasSlot = useHasSlot();

</script>