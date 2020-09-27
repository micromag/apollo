<template>
  <div class="table w-full max-w-full bg-white border rounded">
    <div class="table-row">
      <div v-for="(heading, headingIndex) in columns" :key="headingIndex" class="table-cell px-4 py-4 border-b capitalize font-bold">
        {{heading}}
      </div>
    </div>
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="table-row">
      <div v-for="(column, index) in columns" :key="index" class="table-cell px-4 py-2 border-b truncate">
        {{row.node[column]}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Table',
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {

    let columns = props.columns
    let rows = props.data

    return {columns, rows}
  }
}
</script>