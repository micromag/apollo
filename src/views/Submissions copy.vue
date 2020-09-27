<template>
    <h1 class="text-4xl mb-4 font-semibold">Submissions</h1>
    <input v-model="myTodo" /><button @click="addToDo">Add</button>
    <div v-if="errors !== ''" id="errors">{{ errors }}</div>
    <div v-if="items && items.length > 0"> 
     <div v-for="item in items" :key="item.id">
       {{ item.title }}, {{item.created}}<br /><br />
       <hr />
     </div>
   </div>
</template>

<script lang="ts">
import { db } from '../use/useFirebase'
import { setItems, items } from '../use/useFirestore'

export default {
  name: 'Submissions',
  data: function () {
    return {
      myTodo: '',
      errors: ''
    }
  },
  setup() {
    setItems()
    return {items}
  },
  methods: {
    addToDo: function () {
        db.collection('items').add({
          title: this.myTodo,
          created_at: Date.now()
        }).then((response) => {
          if (response) {
            this.myTodo = ''
          }
        })
    }

  }
}
</script>