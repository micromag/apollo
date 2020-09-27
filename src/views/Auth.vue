<template>
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw; overflow: hidden;">
      <div class="loader"></div>
    </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { auth, checkForMagicLink } from '../use/useFirebase'
import router from '../router/router'

export default {
  name: 'SignIn',
  setup() {
    let mode = router.currentRoute.value.query.mode.toString()
    let actionCode = router.currentRoute.value.query.oobCode.toString()

    checkForMagicLink()

    auth.applyActionCode(actionCode).then(function(resp) {
      console.log(resp);
      router.push({path: "/"});
    }).catch(function(error) {
      // Code is invalid or expired. Ask the user to verify their email address
      // again.
    });
  }
}
</script>