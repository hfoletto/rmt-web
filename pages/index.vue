<template>
  <div class="bg-black h-[calc(100svh_-_4rem)] max-h-[161vw] min-h-[27rem] relative">
    <div class="absolute z-10 max-w-2xl md:left-1/2 md:-translate-x-1/2 p-4 bottom-12">
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">A plataforma do frequentador de cinema</h1>
        <p class="mt-6 text-lg leading-8 text-gray-300">Compartilhe como foi sua experiência nas salas de cinema que você frequenta e leia comentários de outros usuários sobre as que você ainda não conhece.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NuxtLink to="/cinemas" class="rounded-md bg-red-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800">Explorar cinemas</NuxtLink>
          <NuxtLink to="/cadastro" class="text-sm font-semibold leading-6 text-white">Criar conta <span aria-hidden="true">→</span></NuxtLink>
        </div>
      </div>
    </div>
    <img
      class="block absolute inset-0 h-full w-full opacity-95 object-cover"
      src="~/assets/img/home_hero.jpg"
    >
    <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
    <div class="absolute bottom-4 right-4 z-10 text-white opacity-70 text-xs text-right">Cena do filme Taxi Driver – Motorista de Táxi (1976)<br><span class="italic">(Reprodução: Internet)</span></div>
  </div>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-red-800">Rate My Theater</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Visualize e avalie salas de cinema</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">Na hora de ir assistir uma nova estreia, pode ser difícil saber qual cinema e sala escolher. Há vários diferenciais com diferentes preços, mas sem conhecer, não é fácil escolher. Veja como o <span class="font-semibold text-red-800">Rate My Theater</span> pode ajudar você:</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          <div v-for="feature in features" :key="feature.name" class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-800">
                <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">{{ feature.description }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TableCellsIcon, ShareIcon, ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    name: 'Visualize salas de cinemas',
    description:
      'Redes de cinemas ofertam diferentes tipos de salas com diferentes preços e opcionais, veja todas e entenda quais os diferenciais de cada.',
    icon: TableCellsIcon,
  },
  {
    name: 'Compartilhe sua experiência',
    description:
      'Compartilhe como foi sua visita deixando um comentário e avaliando a qualidade de imagem, som, conforto, bomboniere e experiência.',
    icon: ShareIcon,
  },
  {
    name: 'Leia comentários de outros',
    description:
      'Visualize avaliações e comentários de outros usuários para ajudar você a decidir qual nova sala de cinema conhecer ou retornar.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Reveja suas avaliações',
    description:
      'No momento de retornar a uma sala já conhecida, reveja sua avaliação e satisfação com o lugar escolhido na sua útlima visita.',
    icon: StarIcon,
  },
]
</script>
