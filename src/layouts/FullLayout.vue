<template>
    <Navbar :desktop="desktopOptions" :mobile="mobileOptions"/>
    <div class="flex-1 h-screen overflow-auto relative" style="padding: env(safe-area-inset-right) env(safe-area-inset-left);" :class="[isMobile ? 'mb-6' : '']">
      <div class="border-b fixed top-0 left-0 right-0 safeMobile shadow-md" :class="[isMobile ? 'bg-blue-bar' : 'bg-white ml-64']" style="padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);">
          <div v-if="user" class="flex px-4 items-center h-16 float-left">
            <div v-if="isMobile" class="h-10 w-10 mr-4 rounded-md flex text-sm items-center justify-center font-extrabold text-blue-500">
                <img src="/icons/apollo-logo.png">
            </div>
          </div>
          <div v-if="user" class="flex px-4 items-center h-16">
              <UserAvatar :options="userOptions" />
          </div>
      </div>
        
      <div :class="[isMobile ? 'p-4 safeBottomMargin safeTopMargin' : 'p-4 mt-16']">
        <slot />
      </div>
    </div>
</template>

<script lang="ts">
import Navbar from '../components/Navbar.vue'
import UserAvatar from '../components/UserAvatar.vue'
import { useMobile } from '../use/useMobile';
import { user, SignOutUser } from '../use/useFirebase'

export default {
  name: 'FullLayout',
  components: {
      Navbar,
      UserAvatar
    },
    setup() {
        const desktopOptions = [
            {name: "Dashboard", path: "/", icon: ['fas', 'chart-line']},
            {name: "Articles", path: "/articles", icon: ['fas', 'receipt']},
            {name: "Admin", path: "/admin", icon: ['fas', 'cog']}
        ]
        
        const mobileOptions = [
            {name: "Dashboard", path: "/", icon: ['fas', 'chart-line']},
            {name: "Articles", path: "/articles", icon: ['fas', 'receipt']},
            {name: "Admin", path: "/admin", icon: ['fas', 'cog']}
        ]

        const userOptions = [
            {name: "Sign Out", action: SignOutUser, icon: ['fas', 'sign-out-alt']},
        ]

        const { isMobile } = useMobile();

        return {
            desktopOptions, mobileOptions, isMobile, user, SignOutUser, userOptions
        }
    } 
}
</script>

<style lang="postcss">
    #app {
        @apply bg-gray-100 flex
    }

    .safeMobile { 
        height: calc(env(safe-area-inset-top) + 4rem);
    }

    .safeTopMargin {
        margin-top: calc(env(safe-area-inset-top) + 4rem);
    }

    .safeBottomMargin {
        margin-bottom: calc(env(safe-area-inset-bottom) + 4rem);
    }

    .bg-blue-bar {
        background-color: #2196F3;
    }
    
    body {
        font-family: 'Roboto';
    }

    .router-link-active {
        color: white !important;
        opacity: 1 !important;
        font-weight: bold;
    }

    .router-link-inactive {
        opacity: 0.4;
        color: white;
    }

</style>