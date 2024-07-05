<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

//const store = AuthStore()

const form = ref({
  email: null,
  password: null
})

const router = useRouter()

const login = async () => {
  try {
    await axios.post('/login', form.value)
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)
  }
}

//store.clearErrors()
// for spinner
// form.loading = true

// try {
//   // TODO don't fogot change to env const url
//   const response = await axios.post(`http://localhost/api/login`, form.value)
//   if (response.data.error) {
//     console.log(response.data.message)
//   } else {
//     store.setToken(response.data.token)
//     store.setUser(response.data.user)
//     console.log(response.data.message)
//     router.push('/')
//   }
// } catch (error) {
//   store.setErrors(error.response.data.errors)
// }
</script>

<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <!-- <validation-errors :errors="store.errors"></validation-errors> -->

    <form @submit.prevent="login(form)">
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
        >Email address</label
      >

      <div class="mt-2">
        <input
          id="email"
          name="email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <!-- <div v-if="errors['email']" class="text-red-500">{{ errors['email'][0] }}</div> -->
      </div>

      <div class="flex items-center justify-between">
        <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
          >Password</label
        >
      </div>

      <div class="mt-2">
        <input
          id="password"
          name="password"
          v-model="form.password"
          type="password"
          autocomplete="current-password"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <!-- <div v-if="errors['password']" class="text-red-500">{{ errors['password'][0] }}</div> -->
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
