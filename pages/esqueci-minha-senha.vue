<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <NuxtLink to="/" class="block w-12 h-12 mx-auto">
        <img class="h-12 w-auto" src="~/assets/img/logo.png" :alt="config.appName">
      </NuxtLink>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Esqueci minha senha</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form action="#" method="POST" class="space-y-6" @submit.prevent="forgotPassword">
          <TextInput
            id="email"
            v-model="email"
            type="email"
            label="E-mail"
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

const email = ref('')

if (authStore.loggedIn)
  await navigateTo('/')

const forgotPasswordMutationQuery = gql`
  mutation forgotPassword($email: String!) {
  forgotPassword (email: $email)
}
`

const { mutate: forgotPasswordMutation, error, loading } = useMutation(forgotPasswordMutationQuery)

const forgotPassword = async function () {
  const { data } = await forgotPasswordMutation({
    email: email.value,
  })
  if (!error.value) {
    $toast.show({
      type: 'success',
      message: data.forgotPassword,
      timeout: 10,
    })
    window.setTimeout(() => {
      return navigateTo('/')
    }, 3000)
  }
}

</script>
