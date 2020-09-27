/* eslint-disable vue/require-default-prop */
<template>
    <div class="w-64 h-screen bg-blue-ap dark:bg-gray-900" v-if="!isMobile">
    <div class="block px-4 flex items-center h-16 bg-opacity-10 border-b-2 dark-border cursor-pointer dark:border-gray-800" @click="dropdown = dropdown != true">
        <div class="h-10 w-10 mr-4 rounded-md flex text-sm items-center justify-center font-extrabold text-blue-500">
            <img src="/icons/apollo-logo.png">
        </div>
        <div class="leading-5">
            <span class="text-white block text-xs full_opacity">v1.0.0</span>
            <span class="text-white block font-extrabold text-md">Apollo by micro:mag</span>
        </div>
    </div>
        <router-link 
            v-for="option in desktop" 
            :key="option.name" :to="option.path" 
            class="block px-4 flex items-center h-16 router-link-inactive hover:text-white bg-opacity-10"
        >
        <span>
            <font-awesome-icon class="mr-5 text-2xl fa-fw" :icon="option.icon"/>
            {{option.name}}
            <div class="notif-badge" v-if="option.notification">
                {{option.notification}}
            </div>
        </span>
        </router-link>
    </div>
 
    <div class="fixed bottom-0 w-screen bg-blue-nav flex py-2 text-center z-10 shadow-2xl dark:bg-gray-900" v-else>
        <router-link 
            v-for="option in mobile" 
            :key="option.name" :to="option.path" 
            class="block flex-1 items-center h-16 router-link-inactive hover:text-white bg-opacity-10"
        >
        <span class="text-xs relative">
            <font-awesome-icon class="text-xl fa-fw" :icon="option.icon"/><br>
            {{option.name}}
            <div class="notif-badge" v-if="option.notification">
                {{option.notification}}
            </div>
        </span>
        </router-link>
    </div>
</template>}}

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useMobile } from '../use/useMobile';

export default {
    name: "Navbar",
    components: {
        FontAwesomeIcon,
    },
    props: {
        desktop: {
            type: Object,
            required: true
        },
        mobile: {
            type: Object,
            required: true
        },
    }, 
    setup() {

      const { isMobile } = useMobile();

      return {
          isMobile
      }
    }
}
</script>

<style lang="postcss">
    .safeMobile {
        padding-bottom: 0;
        padding-bottom: env(safe-area-inset-bottom, 0);
    }

    .notif-badge {
        position: absolute;
        border-radius: 50%;
        height: 1.5em;
        width: 1.5em;
        background: #F44336;
        color: white;
        top: -0.9em;
        right: -0.3em;
        animation: 0.25s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s 1 normal none running alert;
    }


    .bg-blue-ap {
        background-color: #2196F3;
    }

    .dark-border {
        border-color: rgba(0, 0, 0, 0.1);
    }

    
</style> 