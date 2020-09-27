<template>
  <div class="flex h-screen w-screen items-center flex-col p-4 my-10" >
      <h1 class="font-bold text-4xl mb-10 text-center">Contribute to micro:mag</h1>
      <div class="p-6 bg-white border rounded-lg w-full max-w-lg flex flex-col dark:bg-gray-800 dark:border-gray-900" v-if="status === '1'">
        <div class="bg-red-500 p-4 text-white rounded mb-6 block" v-if="error">
          <span class="block">{{error}}</span>
        </div>
          <DynamicForm :schema="schema" :model-value="data" />
            <button class="btn btn-blue" @click="submitContribution(data.name, data.email, data.title, data.type, data.age)">
              <font-awesome-icon class="mr-2" :icon="['fas', 'check']"/>
              Submit 
            </button>
      </div>
      <div class="p-6 bg-white border rounded w-full max-w-lg dark:text-black" style="height: 593px; display: flex; justify-content: center; align-items: center;" v-if="status === '2'">
        <div class="loader"></div>
      </div>
      <div class="p-6 bg-white dark:text-black border rounded w-full max-w-lg flex flex-col items-center" v-if="status === '3'">
        <img src="https://i.imgur.com/XT9JxqO.gif" height="135" width="135" class="mb-8">
        <span class="text-center">We've successfully recieved your proposal!<br> Below are the links you need to get started with writing an article for us!</span>
      </div>
    </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import DynamicForm from '../components/DynamicForm.vue'
import { db } from '../use/useFirebase'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { schema } from '../forms/contribute/schema'



export default {
  name: 'Contribute',
  components: {
    DynamicForm,
    FontAwesomeIcon
  },
  setup() {

    let data = reactive({})

    let today = new Date();

    let status = ref('1');

    let error = ref();

    let dateModified = today.getDate() + '/' +(today.getMonth()+1)+ '/' + today.getFullYear() + " (" + today.getHours() + ":" + today.getMinutes() + ")"

    const submitContribution = (name, email, title, type, age) => {
      if (Object.keys(data).length === 4){
        status.value = '2'
        db.collection('proposed_articles').add({
            name: name,
            email: email,
            title: title,
            type: type,
            editor: "Assign Editor",
            status: "Proposed",
            created_at: Date.now(),
            modified: dateModified
          }).then(() => {
            status.value = '3'
          })
      }
      else{
        error.value = "Please fill in all the required fields!"
      }
    }

    return {
      data, schema, submitContribution, status, error
    }
  }
}
</script>

<style lang="postcss">
.btn {
  @apply font-bold p-4 rounded w-full;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>

<style scoped>
.loader {
  height: 100px !important;
  width: 100px !important;
}
</style>