<template>
    <component 
      v-for="(field, index) in filteredFields" 
      :key="index" 
      :is="field.component" 
      :value="data[field.name]"
      v-bind="field"
      @input="updateForm(field.name, $event)"
    />
</template>

<script lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
export default {
  name: 'DynamicForm',
  props: {
    schema: Object,
    modelValue: Object,
    submit: Function
  },
  setup(props) {

    onBeforeMount(() => validate()) 


    let data = ref(props.modelValue)

    let fields = ref(props.schema.fields)

    let filteredFields = computed(() => {
      let newFields = [].concat(fields.value);
      return newFields;
    })

    const validate = () => {
      fields.value.forEach((field, index) => {
        if (field.logic){
          field.logic(field, index, filteredFields.value, data.value)
        }
      });
    }

    const updateForm = (fieldName, value) => {
      data.value[fieldName] = value
      validate()
    }


    return {
      updateForm, data, filteredFields, validate
    }
  }
}
</script>