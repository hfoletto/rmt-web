<template>
  <div class="min-h-full">
    <Disclosure v-slot="{ open }" as="nav" class="border-b border-gray-200 bg-white">
      <div class="flex justify-between items-center sm:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <NuxtLink to="/" class="flex flex-shrink-0 items-center">
              <img class="block h-8 w-auto" src="~/assets/img/logo.png" :alt="config.appName">
            </NuxtLink>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.to"
                :class="[item.current
                           ? 'border-red-800 text-gray-900'
                           : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                         'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
          </div>
          <div class="hidden items-center justify-end md:flex md:flex-1 space-x-8">
            <Menu v-if="authStore.loggedIn" as="div" class="relative">
              <div>
                <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <UserCircleIcon class="h-8 w-8 text-gray-400 hover:text-gray-500" aria-hidden="true" />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-for="item in sideNavigationAuthenticated" :key="item.name" v-slot="{ active }">
                    <Component
                      :is="item.hasOwnProperty('action') ? 'button' : NuxtLink"
                      :to="item.hasOwnProperty('to') && item.to"
                      :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']"
                      @click="item.action"
                    >
                      {{ item.name }}
                    </Component>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
            <template v-else>
              <Component
                  v-for="item in sideNavigationUnauthenticated"
                  :key="item.name"
                  :is="item.hasOwnProperty('action') ? 'button' : NuxtLink"
                  :to="item.hasOwnProperty('to') && item.to"
                  :class="[
                      item.type === 'raised' ? 'rounded-md border border-transparent bg-red-800 px-4 py-2 text-white shadow-sm hover:bg-red-700' : 'text-gray-500 hover:text-gray-700',
                      'whitespace-nowrap text-base font-medium']"
                  @click="item.action"
              >
                {{ item.name }}
              </Component>
            </template>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 pt-2 pb-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            :as="NuxtLink"
            :to="item.to"
            :class="[item.current ? 'bg-red-50 border-red-800 text-red-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800', 'block pl-3 pr-4 py-2 border-l-4 text-base font-medium']"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </DisclosureButton>
        </div>
        <div class="border-t border-gray-200 pt-4 pb-3">
          <template v-if="authStore.loggedIn">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <UserCircleIcon class="h-10 w-10 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">{{ authStore.user?.name }}</div>
                <div class="text-sm font-medium text-gray-500">{{ authStore.user?.email }}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <DisclosureButton
                  v-for="item in sideNavigationAuthenticated"
                  :key="item.name"
                  :as="item.hasOwnProperty('action') ? 'button' : NuxtLink"
                  :to="item.hasOwnProperty('to') && item.to"
                  class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  @click="item.action"
              >{{ item.name }}</DisclosureButton>
            </div>
          </template>
          <template v-else>
            <div class="mt-3 flex flex-col space-y-1">
              <DisclosureButton
                  v-for="item in sideNavigationUnauthenticated"
                  :key="item.name"
                  :as="item.hasOwnProperty('action') ? 'button' : NuxtLink"
                  :to="item.hasOwnProperty('to') && item.to"
                  :class="[
                      'block px-4 py-2 text-base font-medium hover:bg-gray-100',
                      item.type === 'raised' ? 'border-transparent bg-red-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700' : 'text-gray-500 hover:text-gray-800'
                  ]"
                  @click="item.action"
              >{{ item.name }}</DisclosureButton>
            </div>
          </template>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { useMutation } from '@vue/apollo-composable'
import { useToast } from 'tailvue'
import { NuxtLink } from '#components'
import { useHead } from '#imports'
import { useAuthStore } from '~/store/auth'

useHead({
  title: 'RMT',
  meta: [{
    name: 'description',
    content: 'Rate My Theater',
  }],
  htmlAttrs: {
    class: 'h-full',
  },
  bodyAttrs: {
    class: 'h-full',
  },
})

const config = useRuntimeConfig()
const authStore = useAuthStore()
const $toast = useToast()

const logoutMutationQuery = gql`
  mutation logout {
    logout {
      name
    }
  }
`

const { mutate: logoutMutation, error, loading } = useMutation(logoutMutationQuery)

async function logout () {
  await logoutMutation()
  if (!error.value) {
    authStore.$patch({
      user: null,
    })
    $toast.show({
      type: 'info',
      message: 'Sessão encerrada com sucesso',
    })
    window.setTimeout(() => {
      return navigateTo('/')
    }, 1000)
  }
}

const navigation = [
  { name: 'Cinemas', to: '/cinemas', current: true },
]
const sideNavigationAuthenticated = [
  { name: 'Perfil', to: '#' },
  { name: 'Sair da conta', action: logout },
]
const sideNavigationUnauthenticated = [
  { name: 'Fazer login', to: '/login', type: 'flat' },
  { name: 'Criar conta', to: '/cadastro', type: 'raised' },
]
</script>
