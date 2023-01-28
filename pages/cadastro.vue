<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=800" alt="Your Company" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Criar uma nova conta</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        ou <a href="/login" class="font-medium text-red-800 hover:text-red-700">clique aqui se já tem uma conta</a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form action="#" method="POST" class="space-y-6" @submit.prevent="register">
          <TextInput v-model="name" label="Nome de usuário" id="name" required />
          <TextInput type="email" v-model="email" label="E-mail" id="email" autocomplete="email" required />
          <TextInput type="email" v-model="confirm_email" label="Confirmar e-mail" id="confirm_email" required />
          <TextInput type="password" v-model="password" label="Senha" id="password" required />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-red-800 focus:ring-red-700" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">Aceito os termos</label>
            </div>
          </div>

          <ErrorAlert v-if="error" :error="error" />

          <div>
            <Button>Continuar</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#imports";
import {useMutation} from "@vue/apollo-composable";

const title = ref('My App')
const description = ref('My App Description')
// This will be reactive even you change title/description above
useHead({
  title,
  meta: [{
    name: 'description',
    content: description
  }],
  htmlAttrs: {
    class: 'h-full bg-gray-50'
  },
  bodyAttrs: {
    class: 'h-full'
  }
})
definePageMeta({
  layout: false,
})

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

const name = ref("")
const email = ref("")
const confirm_email = ref("")
const password = ref("")

const { mutate: createUserMutation, error, loading } = useMutation(createUserMutationQuery)

function register() {
  createUserMutation({
    name: name.value,
    email: email.value,
    password: password.value
  })
}



const theatersQuery = gql`
  query getTheaters {
  theaters (first: 10) {
    data {
      name
    }
  }
}
`
</script>