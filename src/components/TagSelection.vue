<template>
  <multiselect
    :value="value"
    @input="input"
    :options="options"
    :loading="loading"
    label="title"
    trackBy="id"
    multiple
    searchable
    @search-change="searchTags"/>
</template>

<script>
import Multiselect from 'vue-multiselect'
import client from '@/utils/client'
import axios from 'axios'
export default {
  name: 'TagSelection',
  props: {
    value: Array
  },
  data () {
    return {
      options: [],
      loading: false,
    }
  },
  methods: {
    input (val) {
      if (this.buffer && val.length === 0) {
        return
      }
      this.buffer = val.length === 0
      console.log(val)
      this.$emit('input', val)
    },
    searchTags (key) {
      if (!key) return
      this.loading = true
      if (this.timeoutKey) clearTimeout(this.timeoutKey)
      if (this.cancel) {
        this.cancel('New Input')
        this.cancel = null
      }
      this.timeoutKey = setTimeout(() => {
        this.timeoutKey = null
        client.get('/tags', {
          params: {
            search: key
          },
          cancelToken: new axios.CancelToken(c => {
            this.cancel = c
          })
        }).then(response => {
          this.loading = false
          this.options = response.data
        }).catch(error => {
          if (axios.isCancel(error)) {
            return
          }
          throw error
        })
      }, 500)
    }
  },
  components: {
    Multiselect
  }
}
</script>
