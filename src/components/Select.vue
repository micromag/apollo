<template>
<div v-if="visible">
  <label v-if="label" class="w-full block mb-2">{{label}}</label>
  <select :name="name" @input="$emit('input', $event.target.value)" class="block p-4 mb-8 w-full bg-white border border-gray-400 hover:border-gray-500 rounded leading-tight focus:outline-none focus:shadow-outline">
    <option value="" disabled selected>Select an option</option>
    <option v-for="option in options" :value="option.title" :key="option.id">{{option.title}}</option>
  </select>
</div>
</template>

<script>

export default {
  name: 'Select',
  props: {
    name: String,
    label: String,
    options: Object,
    visible: {
      type: Boolean,
      default: true
    }
  },
  emits: ['input']
}
</script>