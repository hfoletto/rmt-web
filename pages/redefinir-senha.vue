<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <NuxtLink to="/" class="block w-12 h-12 mx-auto">
        <img class="h-12 w-auto" src="~/assets/img/logo.png" :alt="config.appName">
      </NuxtLink>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Redefinir senha</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form action="#" method="POST" class="space-y-6" @submit.prevent="resetPassword">
          <TextInput
            id="email"
            :model-value="email"
            type="email"
            label="E-mail"
            disabled
            required
          />
          <TextInput
            id="password"
            v-model="password"
            type="password"
            label="Nova senha"
            :minlength="8"
            required
          />
          <TextInput
            id="password_confirmation"
            v-model="password_confirmation"
            type="password"
            label="Confirmar nova senha"
            :minlength="8"
            required
          />

          <ErrorAlert v-if="error" :error="error" />

          <div>
            <Button :loading="loading">Enviar</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { useToast } from 'tailvue'
import { useHead } from '#imports'
import { useAuthStore } from '~/store/auth'

const $toast = useToast()
const route = useRoute()
const config = useRuntimeConfig()
const authStore = useAuthStore()

useHead({
  htmlAttrs: {
    class: 'h-full bg-gray-50',
  },
  bodyAttrs: {
    class: 'h-full',
  },
})
definePageMeta({
  layout: false,
})

const password = ref('')
const password_confirmation = ref('')

const email = route.query.email as string
const token = route.query.token

if (!token || !email)
  await navigateTo('/')

if (authStore.loggedIn)
  authStore.$patch({
    user: null,
  })

const resetPasswordMutationQuery = gql`
  mutation resetPassword($email: String!, $password: String!, $password_confirmation: String!, $token: String!) {
  resetPassword (email: $email, password: $password, password_confirmation: $password_confirmation, token: $token)
}
`

const { mutate: resetPasswordMutation, error, loading } = useMutation(resetPasswordMutationQuery)

const resetPassword = async function () {
  if (password.value !== password_confirmation.value)
    return $toast.show({
      type: 'danger',
      message: 'As senhas não conferem, verifique e envie novamente.',
      timeout: 10,
    })

  const { data } = await resetPasswordMutation({
    email,
    password: password.value,
    password_confirmation: password_confirmation.value,
    token,
  })
  if (!error.value) {
    $toast.show({
      type: 'success',
      message: data.resetPassword,
      timeout: 6,
    })
    window.setTimeout(() => {
      return navigateTo('/login')
    }, 1000)
  }
}

</script>
