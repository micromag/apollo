<template>
    <component :is="this.$route.meta.layout || defaultLayout">
        <router-view />
    </component>    
</template>

<script lang="ts">
import FullLayout from './layouts/FullLayout.vue'
import { Verification } from './use/useFirebase'

export default {
    name: "App",
    setup() {
        const defaultLayout = FullLayout

        Verification();

        return {
            defaultLayout
        }
    }
}
</script>

<style>

.post {
    padding: 12px;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
}

html
body {
    background-color: #f7fafc;
}

</style>
