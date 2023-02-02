<template>
  <span :class="[
    rating_colors.chip_bg, rating_colors.chip_text,
    'flex flex-wrap items-center px-3 py-1.5 rounded-full font-semibold text-sm flex align-center w-max cursor-pointer'
  ]">
    <Icon :icon="rating_info.icon" :class="[rating_colors.icon, 'mr-1 w-auto h-5']" />
    {{ value?.toFixed(1) ?? ' ' }}
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
  if (props.value) {
    if (props.value >= 4)
      return {
        icon: 'text-amber-700',
        chip_bg: 'bg-amber-100',
        chip_text: 'text-amber-800',
      }
    if (props.value < 2.5)
      return {
        icon: 'text-brown-800',
        chip_bg: 'bg-brown-100',
        chip_text: 'text-brown-900',
      }
  }

  return {
    icon: 'text-slate-800',
    chip_bg: 'bg-slate-100',
    chip_text: 'text-slate-900',
  }
})

</script>
