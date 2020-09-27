<template>
  <div class="flex h-screen w-screen justify-center items-center flex-col p-4" v-if="!verify">
      <h1 class="font-bold text-4xl mb-10">Admin Sign In</h1>
      <div class="p-6 bg-white border rounded w-full max-w-md flex flex-col mb-10">
        <div class="bg-red-500 p-4 text-white rounded mb-6 block" v-if="error.message">
          <span class="block font-bold">{{error.title}}</span>
          <span class="block">{{error.message}}</span>
        </div>
        <label class="mb-2">Email</label>
        <input v-model="form.email" type="email" name="email" placeholder="Enter your email" class="px-4 py-2 border rounded mb-4 block" />
        <label class="mb-2" v-if="!passwordless">Password</label>
        <input v-model="form.password" type="password" name="password" placeholder="Enter your password" class="px-4 py-2 border rounded mb-6 block" v-if="!passwordless" />
        <button @click="SignInUser(form.email, form.password)" class="px-4 py-2 bg-blue-500 text-white rounded mb-2 block" v-if="!passwordless">Sign In</button>
        <button @click="PasswordlessLogin(form.email)" class="px-4 py-2 bg-blue-500 text-white rounded mb-2 block" v-else>Request Magic Link</button>
      </div>
  </div>

  <div class="flex h-screen w-screen justify-center items-center flex-col p-4" v-else>
    <h1 class="font-bold text-4xl mb-10">Magic Link Sent</h1>
    <div class="p-6 bg-white border rounded w-full max-w-md flex flex-col mb-10 items-center">
      <img src="https://i.imgur.com/XT9JxqO.gif" height="135" width="135" class="mb-8">
      <span class="text-center">We've just sent a magic link to your email. Please click the link to log-in to the application.</span>
    </div>
  </div>

  
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { SignInUser, error, PasswordlessLogin, verify } from '../use/useFirebase'

export default {
  name: 'SignIn',
  setup() {

    let form = reactive({
      email: "",
      password: ""
    })

    let passwordless = ref(false);

    return {form, SignInUser, error, passwordless, PasswordlessLogin, verify}
  }
}
</script>