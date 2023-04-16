<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <NuxtLink to="/" class="block w-12 h-12 mx-auto">
        <img class="h-12 w-auto" src="~/assets/img/logo.png" :alt="config.appName">
      </NuxtLink>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Criar uma nova conta</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        ou <NuxtLink to="/login" class="font-medium text-red-800 hover:text-red-700">clique aqui se já tem uma conta</NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form action="#" method="POST" class="space-y-6" @submit.prevent="register">
          <TextInput
            id="name"
            v-model="name"
            label="Nome"
            required
          />
          <TextInput
            id="email"
            v-model="email"
            type="email"
            label="E-mail"
            autocomplete="email"
            required
          />
          <TextInput
            id="confirm_email"
            v-model="confirm_email"
            type="email"
            label="Confirmar e-mail"
            required
          />
          <TextInput
            id="password"
            v-model="password"
            type="password"
            label="Senha"
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

const config = useRuntimeConfig()

const createUserMutationQuery = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
  createUser (name: $name, email: $email, password: $password) {
    name,
    email
  }
}
`

const name = ref('')
const email = ref('')
const confirm_email = ref('')
const password = ref('')

const { mutate: createUserMutation, error, loading } = useMutation(createUserMutationQuery)

const register = async function () {
  if (email.value !== confirm_email.value)
    return $toast.show({
      type: 'danger',
      message: 'Os emails não conferem, verifique e envie novamente.',
      timeout: 10,
    })
  const { data } = await createUserMutation({
    name: name.value,
    email: email.value,
    password: password.value,
  })
  if (!error.value) {
    authStore.$patch({
      user: { ...data.createUser },
    })
    $toast.show({
      type: 'success',
      message: 'Conta criada com sucesso!',
      timeout: 6,
    })
    return navigateTo('/')
  }
}

</script>
