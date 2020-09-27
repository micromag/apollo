<template>
  <h1 class="text-4xl mb-4 font-semibold">Dashboard Mobile</h1>
  <button class="btn btn-blue" @click="notificationPermissions">
    <font-awesome-icon class="mr-2" :icon="['fas', 'bell']"/>
    Allow Notifications
  </button>

  <button class="btn btn-blue mt-6" @click="sendNotification">
    <font-awesome-icon class="mr-2" :icon="['fas', 'check']"/>
    Send Notification
  </button>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'DashboardMobile',
  components: {
    FontAwesomeIcon
  },
  setup() {
    function notificationPermissions() {
      Notification.requestPermission();
    }

    function sendNotification() {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Test Notification', {
          body: 'This is some text',
          tag: 'test-notification'
        });
      });
    }

    return {
      notificationPermissions, sendNotification
    }
  }
}
</script>