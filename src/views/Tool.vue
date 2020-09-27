<template>
<iframe :src="'https://' + $props.site" class="w-full h-full"></iframe>
</template>

<script lang="ts">
export default {
  name: 'Tool',
  props: {
    site: String
  }
}
</script>