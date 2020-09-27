<template>
  <button class="text-white font-bold py-2 px-4 rounded" :class="[buttonSize, color]">
      <span><font-awesome-icon :icon="iconType" />{{value}}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Variant, Size, Icon } from './props'

export default defineComponent({
  name: "FcInput",
  props: {
    variant: {
      type: Object as () => Variant,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    icon: {
      type: Object as () => Icon
    },
    size: {
      type: Object as () => Size
    } 
  },
  setup(props) {
    let color:string = "";
    let buttonSize:string = "";
    let iconType:string = "";

    switch (props.variant){
      case Variant.Primary:
          color = "bg-blue-500"
          break
      case Variant.Secondary:
          color = "bg-red-500"
          break
    }

    switch (props.icon){
      case Icon.cog:
          iconType = "cog"
          break
    }

    switch (props.size){
      case Size.xs:
          buttonSize = "w-12"
          break
      case Size.s:
          buttonSize = "w-16"
          break
      case Size.md:
          buttonSize = "w-24"
          break
      case Size.lg:
          buttonSize = "w-32"
          break
      case Size.xl:
          buttonSize = "w-64"
          break
    }

	  return {
      Variant, color, buttonSize, iconType
    }
  }
})
</script>



