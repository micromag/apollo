<template>
<div class="ml-auto">
    <div class="flex items-center cursor-pointer" @click="dropdown = dropdown != true">
        <div class="rounded-full bg-white border text-white h-10 w-10">
            <img
            class="mr-1 md:mr-2 md:inline-block h-full w-full rounded-full object-cover"
            :src="getAvatar(user.email)"
            alt=""
            />
        </div>
    </div>
    <div class="origin-top-right absolute right-0 mt-6 w-56 rounded-md shadow-lg mr-4" v-if="dropdown">
    <div class="rounded-md bg-white shadow-xs py-2">
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <a v-for="option in options" :key="option.name" @click="option.action" class="block cursor-pointer px-4 py-4 leading-5 text-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
            <font-awesome-icon class="fa-fw mr-2" :icon="option.icon"/>
            <span>{{option.name}}</span>
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { user } from '../use/useFirebase'
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useMobile } from '../use/useMobile'
import { MD5 } from '../use/md5'


export default {
    name: "UserAvatar",
    props: {
        options: {
            type: Object,
            required: true
        }
    },
    components: {
        FontAwesomeIcon
    },
    setup() {
        let dropdown = ref(false);
        const { isMobile } = useMobile();

        const getAvatar = (email) => {
		    let hash = MD5(email)
		    return "https://gravatar.com/avatar/" + hash
	    }

        return { user, dropdown, isMobile , getAvatar }
    }
}
</script>

<style scoped>

</style>