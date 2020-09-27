<template>
<div class="flex" :class="[isMobile ? 'flex-col' : '']">
  <div :class="[isMobile ? 'w-full' : 'w-1/2']">
    <h1 class="text-3xl mb-4 font-semibold">Editing - {{editingFile}}</h1>
  </div>

  <div :class="[isMobile ? 'w-full' : 'w-1/2']">
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right" :class="[isMobile ? 'w-full' : '']" @click="articlesPage">
      <font-awesome-icon class="mr-2" :icon="['fas', 'times']"/>
        Exit
    </button>	
    <button class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right" :class="[isMobile ? 'w-full mt-3 mb-4' : 'mr-5']" @click="loadExtras">
      <font-awesome-icon class="mr-2" :icon="['fas', 'folder-open']"/>
        Extra Files
    </button>	
  </div>

</div>
  <div class="flex" :class="[isMobile ? 'flex-col' : '']">
    <div style="height: calc(100vh - 15rem) !important;" :class="[isMobile ? 'w-full mb-12' : 'w-1/2']">
      <span class="text-xl mb-8 font-extrabold">Editor</span>
      <textarea v-model="source" class="rounded-lg mt-4 shadow-xl p-4 w-full h-full" v-on:keyUp="saveFile"></textarea>
    </div>
    <div style="height: calc(100vh - 15rem) !important;" :class="[isMobile ? 'w-full mt-6 mb-20' : 'w-1/2 ml-8']">
      <span class="text-xl mb-8 font-extrabold">Preview</span>
      <VueMarkdownIt :source='source' class=" bg-white p-4 mt-4 rounded-lg shadow-xl markdown-body w-full h-full box-border overflow-auto overflow-x-hidden" />
    </div>  
  </div>
</template>

<script>
import VueMarkdownIt from 'vue3-markdown-it';
import { getText, markdownText, setSubmitted, editingFile, getExtras, extras } from '../use/useFirestore'
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '../router/router'
import { db } from '../use/useFirebase'
import { useMobile } from '../use/useMobile'

export default {
  components: {
    VueMarkdownIt,
    FontAwesomeIcon
  },
  props: {
    id: String
  },
  setup(props) {
    let source = ref(markdownText)
    let extraFile = ref(extras)
    
    getText(props.id)

    getExtras(props.id)

    const { isMobile } = useMobile();

    const articlesPage = () => {
      router.push({path: "/articles"})
    }

    const loadExtras = () => {
      window.open(extraFile.value)
    }

    const saveFile = () => {
      let itemRef = db.collection("submitted_articles").doc(props.id)
      return itemRef.update({
        file: source.value
      })
    }

    return { source, markdownText, editingFile, saveFile, articlesPage, isMobile, loadExtras }
  }
}
</script>

<style lang="scss" scoped>
@import '~github-markdown-css/github-markdown.css';

textarea {
   resize: none;
}
</style>