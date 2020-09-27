<template>
<div v-if="visible">
  <label v-if="label" class="w-full block mb-2 required-field">{{label}}</label>
  <input 
    :type="type" 
    :name="name"
    :placeholder="placeholder" 
    :value="value"
    @change="$emit('input', $event.target.value)"
    class="p-4 mb-8 w-full border rounded block dark:text-black"
  /> 
</div>
</template>

<script>

export default {
  name: 'Input',
  props: {
    type: String,
    name: String,
    label: String,
    visible: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    value: String
  },
  emits: ['input']
}
</script>

<style>
.required-field::after {
    content: "*";
    margin-left: 7px;
    color: red;
}
</style>