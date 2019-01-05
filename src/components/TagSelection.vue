<template>
  <multiselect
    :value="value"
    @input="input"
    :options="options"
    label="title"
    trackBy="id"
    multiple
    searchable
    @search-change="searchTags"/>
</template>

<script>
import Multiselect from 'vue-multiselect'
import client from '@/utils/client'
export default {
  name: 'TagSelection',
  props: {
    value: Array
  },
  data () {
    return {
      options: []
    }
  },
  methods: {
    input (val) {
      this.$emit('input', val)
    },
    searchTags (key) {
      client.get('/tags', {
        params: {
          search: key
        }
      }).then(response => {
        this.options = response.data
      })
    }
  },
  components: {
    Multiselect
  }
}
</script>
