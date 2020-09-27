<template>
  <div class="flex h-full w-screen items-center flex-col p-4 my-10" >
      <h1 class="font-bold text-4xl mb-10 text-center">Submit your article</h1>
      <div class="p-6 bg-white border rounded-lg w-full max-w-lg flex flex-col mb-10 dark:bg-gray-800 dark:border-gray-900" v-if="status === '1'">
        <div class="bg-red-500 p-4 text-white rounded mb-6 block" v-if="error">
          <span class="block">{{error}}</span>
        </div>
          <DynamicForm :schema="schema" :model-value="data" />
            <label class="w-full block mb-2 required-field">Upload Article (.txt or Markdown File)</label>
            <button class="btn bg-red-500" @click="openFile()" v-if="!uploaded">
              <font-awesome-icon class="mr-2" :icon="['fas', 'upload']"/>
              Upload 
            </button>
            <button class="btn bg-green-400 cursor-default" v-else>
              <font-awesome-icon class="mr-2" :icon="['fas', 'check']"/>
              Uploaded
            </button>
            <button class="btn btn-blue mt-6" @click="submitArticle(data.name, data.email, data.title, data.type, data.link)">
              <font-awesome-icon class="mr-2" :icon="['fas', 'check']"/>
              Submit 
            </button>
      </div>
      <div class="p-6 bg-white border rounded w-full max-w-lg" style="height: 593px; display: flex; justify-content: center; align-items: center;" v-if="status === '2'">
        <div class="loader"></div>
      </div>
      <div class="p-6 bg-white border rounded w-full max-w-lg flex flex-col items-center dark:text-black" v-if="status === '3'">
        <img src="https://i.imgur.com/XT9JxqO.gif" height="135" width="135" class="mb-8">
        <span class="text-center">We've successfully recieved your article!<br> We'll be in touch soon over email with feedback/publication details!</span>
      </div>
    </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import DynamicForm from '../components/DynamicForm.vue'
import { db } from '../use/useFirebase'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { schema } from '../forms/submit/schema'
import { openFile, textFile, uploaded } from '../use/openFile'


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

    const submitArticle = (name, email, title, type, link) => {

      if (uploaded.value && Object.keys(data).length === 5){
        status.value = '2'
        db.collection('submitted_articles').add({
            name: name,
            email: email, 
            title: title,
            editor: "Assign Editor",
            status: "Submitted",
            type: type,
            file: textFile,
            link: link,
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
      data, schema, submitArticle, openFile, uploaded, status, error
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