<template>
  <div class="min-h-full">
    <Disclosure v-slot="{ open }" as="nav" class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <NuxtLink to="/" class="flex flex-shrink-0 items-center">
              <img class="block h-8 w-auto" src="~/assets/img/logo.png" :alt="config.appName">
            </NuxtLink>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[item.current
                    ? 'border-red-800 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</NuxtLink>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <!-- Profile dropdown -->
            <Menu v-if="store.loggedIn" as="div" class="relative ml-3">
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
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <component
                      :is="item.hasOwnProperty('action') ? 'button' : 'a'"
                      :href="item.hasOwnProperty('href') && item.href"
                      :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']"
                      @click="item.action"
                    >
                      {{ item.name }}
                    </component>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
            <div v-else class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <NuxtLink to="/login" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-700">Fazer login</NuxtLink>
              <NuxtLink to="/cadastro" class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-red-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700">Criar conta</NuxtLink>
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
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 pt-2 pb-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[item.current ? 'bg-indigo-50 border-red-800 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800', 'block pl-3 pr-4 py-2 border-l-4 text-base font-medium']"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </DisclosureButton>
        </div>
        <div class="border-t border-gray-200 pt-4 pb-3">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <UserCircleIcon class="h-10 w-10 text-gray-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
              <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
            </div>
            <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1">
            <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">{{ item.name }}</DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { useMutation } from '@vue/apollo-composable'
import { useToast } from 'tailvue'
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
const store = useAuthStore()
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
    store.$patch({
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

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
}

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
const userNavigation = [
  { name: 'Perfil', href: '#' },
  { name: 'Sair da conta', action: logout },
]
</script>
