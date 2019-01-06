<template>
  <b-container class="py-4">
    <b-row>
      <b-col md="3">
        <b-card header="Card Title">
          <p class="card-text">
            <tag-selection v-model="filters.tags"></tag-selection>
          </p>
        </b-card>
      </b-col>
      <b-col md="9">
        <b-list-group v-if="questions">
          <b-list-group-item
            v-for="question in questions"
            :key="question.id"
            :to="{ name: 'question', params: { questionID: question.id }}">
            <latex inline class="mb-1" :value="question.content"/>
            <div class="library-badge-container">
              <b-badge
                v-for="tag in question.tags"
                :key="tag.id"
                :variant="filters.tags && filters.tags.some(t => t.id === tag.id) ? 'primary' : 'secondary'">
                {{ tag.title }}
              </b-badge>
            </div>
          </b-list-group-item>
        </b-list-group>
        <b-pagination
          size="md"
          :total-rows="pagination.totalQuestionCount"
          v-model="pagination.page"
          :per-page="pagination.perpage"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TagSelection from '@/components/TagSelection'
import Latex from '@/components/Latex'
import client from '@/utils/client'

export default {
  name: 'Library',
  data: () => ({
    questions: null,
    pagination: {
      page: 1,
      totalPageCount: null,
      totalQuestionCount: null,
      perpage: 15,
    },
    filters: {
      tags: [],
    }
  }),
  methods: {
    loadPage () {
      const params = new URLSearchParams()
      params.append('page', this.pagination.page)
      params.append('pageSize', this.pagination.perpage)
      if (this.filters.tags && this.filters.tags.length > 0) {
        params.append('tags', this.filters.tags.map(tag => tag.id).join(','))
      }
      client.get('/questions', {
        params: params
      })
        .then(response => {
          this.questions = response.data
          this.pagination.totalPageCount = parseInt(response.headers['x-total-page-count'])
          this.pagination.totalQuestionCount = parseInt(response.headers['x-total-count'])
        })
    }
  },
  mounted () {
    this.loadPage()
  },
  watch: {
    'pagination.page' (page) {
      this.loadPage(page)
    },
    'filters.tags' (tags) {
      this.pagination.page = 1
      this.loadPage(1)
    }
  },
  components: {
    TagSelection,
    Latex
  }
}
</script>

<style lang="scss">
.library-badge-container {
  .badge {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
