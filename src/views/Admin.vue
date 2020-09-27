<template>
  <h1 class="mb-4">Admin</h1>
  <span class="text-xl">Register Administrator</span>
  <div class="w-full bg-blue-900 rounded-lg mt-2 shadow-xl font-bold p-4 text-white">
  <div class="bg-red-500 p-4 text-white rounded mb-6 block" v-if="error.message">
      <span class="block font-bold">{{error.title}}</span>
          <span class="block">{{error.message}}</span>
        </div>
        <label class="mb-2">Email</label>
        <input v-model="form.email" type="email" name="email" placeholder="Enter your email" class="px-4 py-2 border rounded mb-4 block w-full text-gray-900" />
        <label class="mb-2">Password</label>
        <input v-model="form.password" type="password" name="password" placeholder="Enter your password" class="px-4 py-2 border rounded mb-6 block w-full text-gray-900" />
        <button @click="RegisterUser(form.email, form.password)" class="px-4 py-2 bg-green-400 text-black rounded mb-2 block w-full">Register</button>
  </div>
</template> 

<script lang="ts">
import { reactive } from 'vue'
import { RegisterUser, error, verify } from '../use/useFirebase'

export default {
  name: 'Admin',
  setup() {

    let form = reactive({
      name: "",
      email: "",
      password: ""
    })

    return {form, RegisterUser, error, verify}
  }
}
</script>
