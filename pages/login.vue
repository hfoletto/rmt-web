<template>
  <div class="flex min-h-screen">
    <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <NuxtLink to="/" class="block w-12 h-12">
            <img class="h-12 w-auto" src="~/assets/img/logo.png" :alt="config.appName">
          </NuxtLink>
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Entrar na minha conta</h2>
          <p class="mt-2 text-sm text-gray-600">
            ou <NuxtLink to="/cadastro" class="font-medium text-red-800 hover:text-red-700">criar uma nova conta</NuxtLink>
          </p>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form action="#" method="POST" class="space-y-6" @submit.prevent="login">
              <TextInput
                id="email"
                v-model="email"
                type="email"
                label="E-mail"
                autocomplete="email"
                required
              />
              <TextInput
                id="password"
                v-model="password"
                type="password"
                label="Senha"
                autocomplete="password"
                required
              />

              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <NuxtLink to="/esqueci-minha-senha" class="font-medium text-red-800 hover:text-red-700">Esqueceu sua senha?</NuxtLink>
                </div>
              </div>

              <ErrorAlert v-if="error" :error="error" />

              <div>
                <Button :loading="loading">Entrar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="~/assets/img/login_background.jpg" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'tailvue'
import { useMutation } from '@vue/apollo-composable'
import { useHead } from '#imports'
import { useAuthStore } from '@/store/auth'

useHead({
  htmlAttrs: {
    class: 'h-full bg-white',
  },
  bodyAttrs: {
    class: 'h-full',
  },
})
definePageMeta({
  layout: false,
})

const config = useRuntimeConfig()

const store = useAuthStore()

if (store.loggedIn)
  await navigateTo('/')

const $toast = useToast()

const email = ref('')
const password = ref('')

const loginMutationQuery = gql`
  mutation login($email: String!, $password: String!) {
    login (email: $email, password: $password) {
      name,
      email
    }
  }
`

const { mutate: loginMutation, error, loading } = useMutation(loginMutationQuery)

async function login () {
  const { data } = await loginMutation({ email: email.value, password: password.value })
  if (!error.value) {
    store.$patch({
      user: { ...data.login },
    })
    $toast.show({
      type: 'success',
      message: 'Sessão iniciada com sucesso',
    })
    window.setTimeout(() => {
      return navigateTo('/')
    }, 1000)
  }
}

</script>
