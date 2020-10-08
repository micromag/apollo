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
    <button class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right" :class="[isMobile ? 'w-full mt-3' : 'mr-5']" @click="loadExtras">
      <font-awesome-icon class="mr-2" :icon="['fas', 'folder-open']"/>
        Extra Files
    </button>	
    <button class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" :class="[isMobile ? 'w-full mt-3 mb-4' : 'mr-5']" @click="info = true">
      <font-awesome-icon class="mr-2" :icon="['fas', 'info-circle']"/>
        Info
    </button>	
  </div>

</div>
  <div class="flex" :class="[isMobile ? 'flex-col' : '']">
    <div style="height: calc(100vh - 15rem) !important;" :class="[isMobile ? 'w-full mb-12' : 'w-1/2']">
      <span class="text-xl mb-8 font-extrabold">Editor</span>
      <textarea v-model="source" class="rounded-lg mt-4 shadow-xl p-4 w-full h-full dark:bg-gray-700 noResize" v-on:keyUp="updateFirebase" id="left"></textarea>
    </div>
    <div style="height: calc(100vh - 15rem) !important;" :class="[isMobile ? 'w-full mt-6 mb-20' : 'w-1/2 ml-8']">
      <span class="text-xl mb-8 font-extrabold">Preview</span>
      <VueMarkdownIt :source='source' class=" bg-white p-4 mt-4 rounded-lg shadow-xl markdown-body w-full h-full box-border overflow-auto overflow-x-hidden" id="right" />
    </div>  
  </div>
<transition name="fade">
  <Modal title="Article Info" v-if="info">
    <template v-slot:main>
      <span class="font-extrabold">Character Count: </span>{{source.length}}<br>
      <span class="font-extrabold">Word Count: </span>{{source.split(/\b\S+\b/).length - 1}}<br>
    </template>
    <template v-slot:buttons>
      <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="info = false">
            Close
        </button>
      </span>
    </template>
  </Modal>
</transition>
</template>

<script>
import VueMarkdownIt from 'vue3-markdown-it';
import { getText, markdownText, setSubmitted, editingFile, getExtras, extras } from '../use/useFirestore'
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '../router/router'
import { db } from '../use/useFirebase'
import { useMobile } from '../use/useMobile'
import Modal from '../components/Modal'

export default {
  components: {
    VueMarkdownIt,
    FontAwesomeIcon,
    Modal
  },
  props: {
    id: String
  },
  mounted() {
    var isSyncingLeftScroll = false;
    var isSyncingRightScroll = false;
    var leftDiv = document.getElementById('left');
    var rightDiv = document.getElementById('right');

    leftDiv.onscroll = function() {
      if (!isSyncingLeftScroll) {
        isSyncingRightScroll = true;
        rightDiv.scrollTop = this.scrollTop;
      }
      isSyncingLeftScroll = false;
    }

    rightDiv.onscroll = function() {
      if (!isSyncingRightScroll) {
        isSyncingLeftScroll = true;
        leftDiv.scrollTop = this.scrollTop;
      }
      isSyncingRightScroll = false;
    }
  },
  setup(props) {
    let source = ref(markdownText)
    let extraFile = ref(extras)

    let info = ref(false)
    
    getText(props.id)

    getExtras(props.id)

    const { isMobile } = useMobile();

    const articlesPage = () => {
      router.push({path: "/articles"})
    }

    const loadExtras = () => {
      window.open(extraFile.value)
    }

    let timeoutRef = null;

    function updateFirebase() {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef);
      }

      timeoutRef = setTimeout(() => {

      let itemRef = db.collection("submitted_articles").doc(props.id)
      itemRef.update({
        file: source.value
      })

      }, 200)
    }

    return { source, markdownText, editingFile, saveFile, articlesPage, isMobile, loadExtras, info, updateFirebase }
  }
}
</script>

<style lang="scss">
@import '~github-markdown-css/github-markdown.css';

.noResize {
   resize: none;
}

.markdown-body ol{
    padding-left: 2em;
    list-style-type: decimal !important;
}

.markdown-body ul {
    list-style-type: disc !important;
}
</style>