<template>
  <div class="flex h-screen w-screen justify-center items-center flex-col p-4" v-if="!verify">
      <h1 class="font-bold text-4xl mb-10">Register</h1>
      <div class="p-6 bg-white border rounded w-full max-w-md flex flex-col mb-10">
        <div class="bg-red-500 p-4 text-white rounded mb-6 block" v-if="error.message">
          <span class="block font-bold">{{error.title}}</span>
          <span class="block">{{error.message}}</span>
        </div>
        <label class="mb-2">Email</label>
        <input v-model="form.email" type="email" name="email" placeholder="Enter your email" class="px-4 py-2 border rounded mb-4 block" />
        <label class="mb-2">Password</label>
        <input v-model="form.password" type="password" name="password" placeholder="Enter your password" class="px-4 py-2 border rounded mb-6 block" />
        <button @click="RegisterUser(form.email, form.password)" class="px-4 py-2 bg-blue-500 text-white rounded mb-2 block">Register</button>
      </div>
      <router-link to="/sign-in" class="hover:underline" v-if="!verify">Already a user? Sign In</router-link>
    </div>
    
    <div class="flex h-screen w-screen justify-center items-center flex-col p-4" v-else>
      <h1 class="font-bold text-4xl mb-10">Verify your email!</h1>
      <div class="p-6 bg-white border rounded w-full max-w-md flex flex-col mb-10 items-center">
        <img src="https://i.imgur.com/XT9JxqO.gif" height="135" width="135" class="mb-8">
        <span class="text-center">Your account has been successfully registered. To complete the process, please check your email for a validation request.</span>
      </div>
    </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { RegisterUser, error, verify } from '../use/useFirebase'

export default {
  name: 'SignIn',
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