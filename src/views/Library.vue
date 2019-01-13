<template>
  <b-container class="py-4">
    <b-row>
      <b-col md="7">
        <b-list-group v-if="questions">
          <question-list-item
            v-for="question in questions"
            :question="question"
            :key="question.id">
            <b-btn
              v-if="editingExam"
              slot="action-btn"
              size="sm"
              variant="outline-primary"
              class="float-right"
              @click.prevent="addExamQuestion(question)">
              Add >>>
            </b-btn>
          </question-list-item>
        </b-list-group>
        <b-pagination
          class="my-3 justify-content-center"
          size="md"
          :total-rows="pagination.totalQuestionCount"
          v-model="pagination.page"
          :per-page="pagination.perpage"/>
      </b-col>
      <b-col md="5">
        <b-card header="Actions" class="mb-2">
          <p class="card-text">
            <b-btn @click="addQuestion">Add Question</b-btn>
          </p>
        </b-card>
        <div class="sticky-top">
          <b-card header="Filters" class="my-2">
            <p class="card-text">
              <tag-selection v-model="filters.tags"></tag-selection>
            </p>
          </b-card>
          <b-card no-body header="Exam Questions" v-if="editingExam" class="my-2">
            <b-list-group flush>
              <b-list-group-item v-if="editingExam.examQuestions.length === 0">
                The list is empty
              </b-list-group-item>
              <question-list-item
                v-for="(examQuestion, index) in editingExam.examQuestions"
                :question="examQuestion.question"
                :key="examQuestion.question.id">
                <b-btn
                  slot="action-btn"
                  class="float-right"
                  size="sm"
                  @click.prevent="removeExamQuestion(index)"
                  variant="danger">Delete</b-btn>
              </question-list-item>
            </b-list-group>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TagSelection from '@/components/TagSelection'
import QuestionListItem from '@/components/QuestionListItem'
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
    },
    addQuestion () {
      client.post('/questions', {
        options: ['Default Option'],
      })
        .then(response => {
          this.$router.push({
            name: 'question',
            params: {
              questionID: response.data.id
            }
          })
        })
    },
    addExamQuestion (question) {
      console.log(question)
      this.$store.commit('addExamQuestion', question)
    },
    removeExamQuestion (index) {
      this.$store.commit('removeExamQuestion', index)
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
  computed: {
    editingExam () {
      return this.$store.state.editingExam
    }
  },
  components: {
    TagSelection,
    QuestionListItem,
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
