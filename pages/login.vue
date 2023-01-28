<template>
  <div class="flex min-h-screen">
    <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=800" alt="Your Company">
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Entrar na minha conta</h2>
          <p class="mt-2 text-sm text-gray-600">
            ou <a href="/cadastro" class="font-medium text-red-800 hover:text-red-700">criar uma nova conta</a>
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
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-red-800 focus:ring-red-700">
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900">Lembrar-me</label>
                </div>

                <div class="text-sm">
                  <a href="#" class="font-medium text-red-800 hover:text-red-700">Esqueceu sua senha?</a>
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
import { useMutation } from '@vue/apollo-composable'
import { useHead } from '#imports'

const title = ref('My App')
const description = ref('My App Description')
// This will be reactive even you change title/description above
useHead({
  title,
  meta: [{
    name: 'description',
    content: description,
  }],
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

const email = ref('')
const password = ref('')

const data = ref(null as Object|null)

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
  console.log('ok1')
  await loginMutation({ email: email.value, password: password.value })
  if (!error.value)
    return navigateTo('/')
}

</script>
