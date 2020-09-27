<template>
  <template v-if="isMobile">
    <h1 class="text-4xl mb-4 font-semibold">{{greeting}}</h1>
    <div class="w-full bg-blue-500 rounded-lg shadow-xl p-4" style="height: 200px;">
        <span class="font-extrabold text-xl text-white">Today ⏰</span><br>
        <span class="text-4xl text-white block leading-12 text-center mt-2"><b>{{time}}</b></span>
        <span class="text-4xl text-white block leading-12 text-center"><b>{{date}}</b></span>
    </div>
    <div class="w-full bg-red-500 mt-6 rounded-lg shadow-xl p-4" style="height: 200px;">
        <span class="font-extrabold text-xl text-white">Contributions ✍️</span>
        <span class=" text-white block leading-12 text-center" style="font-size: 85px;"><b>{{noProposed}}</b></span>
    </div>
    <div class="w-full bg-orange-500 mt-6 rounded-lg shadow-xl p-4" style="height: 200px;">
        <span class="font-extrabold text-xl text-white">Submissions 🔖</span>
        <span class=" text-white block leading-12 text-center" style="font-size: 85px;"><b>{{noSubmissions}}</b></span>
    </div>
    <div style="height: 250px;" class="bg-green-400 w-full rounded-lg shadow-xl p-4 mt-6 dark:text-black">
        <span class="font-extrabold text-xl text-white">Handy Links 🔗</span>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Contribute Form</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('/contribute')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Submissions Form</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('/submit')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Ghost Admin Panel</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('https://new.micromag.cc/ghost')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
      </div>
      <div style="height: 250px;" class="bg-blue-900 w-full rounded-lg shadow-xl p-4 mt-6 dark:text-black">
        <span class="font-extrabold text-xl text-white">Handy Links 🔗</span>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Miro</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('https://miro.com')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Mailchimp</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('https://mailchimp.com')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Email</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('https://mail.zoho.eu')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
      </div>
  </template>

  <template v-else>
    <h1 class="text-4xl mb-4 font-semibold">{{greeting}}</h1>
    <div class="flex w-full" style="height: 200px;">
      <div class="w-1/3 bg-blue-500 mr-8 rounded-lg shadow-xl p-4">
        <span class="font-extrabold text-xl text-white">Today ⏰</span><br>
        <span class="text-4xl text-white block leading-12 text-center mt-2"><b>{{time}}</b></span>
        <span class="text-4xl text-white block leading-12 text-center"><b>{{date}}</b></span>
      </div>
      <div class="w-1/3 bg-red-500 mr-8 rounded-lg shadow-xl p-4">
        <span class="font-extrabold text-xl text-white">Contributions ✍️</span>
        <span class=" text-white block leading-12 text-center" style="font-size: 85px;"><b>{{noProposed}}</b></span>
      </div>
      <div class="w-1/3 bg-orange-500 rounded-lg shadow-xl p-4">
        <span class="font-extrabold text-xl text-white">Submissions 🔖</span>
        <span class=" text-white block leading-12 text-center" style="font-size: 85px;"><b>{{noSubmissions}}</b></span>
      </div>
    </div>
    <div class="flex mt-8 dark:text-black">
      <div style="height: 250px;" class="bg-green-400 w-1/2 rounded-lg shadow-xl p-4 mr-8">
        <span class="font-extrabold text-xl text-white">Handy Links 🔗</span>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Contribute Form</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('/contribute')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Submissions Form</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('/submit')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Ghost Admin Panel</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('https://new.micromag.cc/ghost')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
      </div>

      <div style="height: 250px;" class="bg-blue-900 w-1/2 rounded-lg shadow-xl p-4">
        <span class="font-extrabold text-xl text-white">Handy Links 🔗</span>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Miro</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('https://miro.com')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Mailchimp</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('https://mailchimp.com')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
        <div class="bg-white w-full h-12 rounded-lg mt-3 p-1 shadow-lg">
          <span class="inline-block align-middle pt-2 pl-2">Email</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" @click="openURL('https://mail.zoho.eu')">
            <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
          </button>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import DashboardMobile from './DashboardMobile.vue'
import { useMobile } from '../use/useMobile'
import { ref } from 'vue';
import { greet } from '../use/personalise'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { setProposed, setSubmitted, noProposed, noSubmissions } from '../use/useFirestore'


export default {
  name: 'Dashboard',
  components: {
    DashboardMobile,
    FontAwesomeIcon
  },
  setup() {

      const { isMobile } = useMobile();

      let greeting = greet()

      let today = new Date();

      let time = today.getHours() + ":" + today.getMinutes()

      let date = today.getDate() + '/' +(today.getMonth()+1)+ '/' + today.getFullYear()

      const openURL = (site) => {
        window.location.href = site
      }

      setProposed()
      setSubmitted()

      return {
          isMobile,
          greeting,
          time,
          date,
          noProposed,
          noSubmissions,
          openURL      
      }
    }
}
</script>