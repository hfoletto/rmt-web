<template>
  <main class="grid min-h-screen place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-red-800">{{ error.statusCode }}</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{{ error.message }}</h1>
      <p class="mt-6 text-base leading-7 text-gray-600">Houve um problema e não foi possível exibir a página que você estava buscando.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <NuxtLink to="/" class="rounded-md bg-red-800 text-white hover:bg-red-700 focus:ring-red-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Voltar para o início</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  htmlAttrs: {
    class: 'h-full bg-white',
  },
  bodyAttrs: {
    class: 'h-full',
  },
})

defineProps<{
  error: Object,
}>()
</script>
