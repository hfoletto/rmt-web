<template>
  <span :class="[
    rating_colors.chip_bg, rating_colors.chip_text,
    'flex flex-wrap items-center px-2.5 py-1.5 rounded-full font-mono font-semibold text-sm flex align-center w-max cursor-pointer'
  ]">
    <Icon :icon="rating_info.icon" :class="[rating_colors.icon, 'mr-1 w-auto h-5']" />
    {{ value?.toFixed(1) ?? 'N/A' }}
  </span>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import panoramaSharp from '@iconify-icons/material-symbols/panorama-sharp'
import speakerIcon from '@iconify-icons/material-symbols/speaker'
import eventSeat from '@iconify-icons/material-symbols/event-seat'
import storefrontIcon from '@iconify-icons/material-symbols/storefront'
import magicButton from '@iconify-icons/material-symbols/magic-button'
import { IconifyIcon } from '@iconify/types'

type RatingType = 'image' | 'audio' | 'comfort' | 'bomboniere' | 'experience'

interface RatingTypeInfo {
  icon: IconifyIcon
}

interface RatingLevelColors {
  icon: string
  chip_bg: string
  chip_text: string
}

const props = defineProps<{
  type: RatingType
  value: number | null
}>()

const ratingTypeInfos: Record<RatingType, RatingTypeInfo> = {
  image: {
    icon: panoramaSharp,
  },
  audio: {
    icon: speakerIcon,
  },
  comfort: {
    icon: eventSeat,
  },
  bomboniere: {
    icon: storefrontIcon,
  },
  experience: {
    icon: magicButton,
  },
}

const rating_info = ratingTypeInfos[props.type]

const rating_colors = computed((): RatingLevelColors => {
  if (!props.value)
    return {
      icon: 'text-gray-400',
      chip_bg: 'bg-gray-200',
      chip_text: 'text-gray-500',
    }

  if (props.value >= 4)
    return {
      icon: 'text-green-700',
      chip_bg: 'bg-green-100',
      chip_text: 'text-green-800',
    }
  if (props.value < 2.5)
    return {
      icon: 'text-red-700',
      chip_bg: 'bg-red-100',
      chip_text: 'text-red-800',
    }

  return {
    icon: 'text-yellow-800',
    chip_bg: 'bg-yellow-100',
    chip_text: 'text-yellow-900',
  }
})

</script>
