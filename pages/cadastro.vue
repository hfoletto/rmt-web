<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="~/assets/img/logo.png" :alt="config.appName" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Criar uma nova conta</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        ou <a href="/login" class="font-medium text-red-800 hover:text-red-700">clique aqui se já tem uma conta</a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form action="#" method="POST" class="space-y-6" @submit.prevent="register">
          <TextInput id="name" v-model="name" label="Nome de usuário" required />
          <TextInput
            id="email"
            v-model="email"
            type="email"
            label="E-mail"
            autocomplete="email"
            required
          />
          <TextInput id="confirm_email" v-model="confirm_email" type="email" label="Confirmar e-mail" required />
          <TextInput id="password" v-model="password" type="password" label="Senha" required />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-red-800 focus:ring-red-700">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">Aceito os termos</label>
            </div>
          </div>

          <ErrorAlert v-if="error" :error="error" />

          <div>
            <Button :loading="loading">Continuar</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { useHead } from '#imports'

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
  login (email: "josu", password: "woah") {
    name
  }
}
`

const name = ref('')
const email = ref('')
const confirm_email = ref('')
const password = ref('')

const { mutate: createUserMutation, error, loading } = useMutation(createUserMutationQuery)

function register () {
  createUserMutation({
    name: name.value,
    email: email.value,
    password: password.value,
  })
}

</script>
