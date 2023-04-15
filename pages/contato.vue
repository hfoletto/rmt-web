<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Entre em contato</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Contate-nos para resolução de dúvidas, críticas, sugestões, elogios e solicitação de adição, remoção ou atualização de conteúdo.</p>
    </div>
    <form class="mx-auto mt-16 max-w-xl sm:mt-20" @submit.prevent="contact">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Nome</label>
          <div class="mt-2.5">
            <input
              id="first-name"
              v-model="first_name"
              type="text"
              name="first-name"
              autocomplete="given-name"
              required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
            >
          </div>
        </div>
        <div>
          <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Sobrenome</label>
          <div class="mt-2.5">
            <input
              id="last-name"
              v-model="last_name"
              type="text"
              name="last-name"
              autocomplete="family-name"
              required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
            >
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">E-mail</label>
          <div class="mt-2.5">
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
            >
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="phone-number" class="block text-sm font-semibold leading-6 text-gray-900">Telefone</label>
          <div class="relative mt-2.5">
            <input
              id="phone-number"
              v-model="phone_number"
              type="tel"
              name="phone-number"
              autocomplete="tel"
              required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
            >
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Mensagem</label>
          <div class="mt-2.5">
            <textarea
              id="message"
              v-model="message"
              name="message"
              rows="4"
              required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <Button :loading="loading">Enviar</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'tailvue'

const $toast = useToast()

const first_name = ref('' as string)
const last_name = ref('' as string)
const email = ref('' as string)
const phone_number = ref('' as string)
const message = ref('' as string)

const reset = function () {
  first_name.value = ''
  last_name.value = ''
  email.value = ''
  phone_number.value = ''
  message.value = ''
}

const { mutate: contactMutate, error, loading } = useMutation(gql`
      mutation contact (
        $name: String!,
        $email: String!,
        $phone_number: String!,
        $message: String!,
      ) {
        contact (
          name: $name
          email: $email
          phone_number: $phone_number
          message: $message
        )
      }
    `, () => ({
  variables: {
    name: `${first_name.value} ${last_name.value}`,
    email: email.value,
    phone_number: phone_number.value,
    message: message.value,
  },
}))

const contact = async function () {
  await contactMutate()
  if (!error.value) {
    $toast.show({
      type: 'success',
      message: 'Mensagem de contato enviada com sucesso!',
      timeout: 6,
    })
    reset()
  }
}
</script>
