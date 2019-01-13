<template>
  <b-container class="py-4">
    <b-row>
      <b-col md="7">
        <b-list-group v-if="questions">
          <draggable v-model="questions" :options="{ animation: 150, group: 'question', sort: false }" >
            <question-list-item
              v-for="question in questions"
              :question="question"
              :key="question.id">
            </question-list-item>
          </draggable>
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
            <b-card-body>
              <p class="card-text">
                <span>You are editing exam </span>
                <router-link :to="{ name: 'exam', params: { examID: editingExam.id }}">
                  <strong v-text="editingExam.title"/>
                </router-link>
              </p>
            </b-card-body>
            <b-list-group flush>
              <draggable
                :value="editingExam.examQuestions.map(examQuestion => examQuestion.question)"
                :options="{ animation: 150, group: 'question' }"
                @change="examQuestionChanged"
                id="selected-question-list">
                <question-list-item
                  v-for="examQuestion in editingExam.examQuestions"
                  :question="examQuestion.question"
                  :key="examQuestion.question.id">
                </question-list-item>
              </draggable>
            </b-list-group>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import draggable from 'vuedraggable'
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
          let questions = response.data
          if (this.editingExam) {
            questions = questions
              .filter(question =>
                !this.editingExam.examQuestions
                  .some(examQuestion => examQuestion.question.id === question.id))
          }
          this.questions = questions
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
    examQuestionChanged (change) {
      if (change.added) {
        this.$store.commit('addExamQuestion', change.added)
      } else if (change.removed) {
        this.$store.commit('removeExamQuestion', change.removed.oldIndex)
      } else if (change.moved) {
        this.$store.commit('removeExamQuestion', change.moved.oldIndex)
        this.$store.commit('addExamQuestion', change.moved)
      }
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
    },
  },
  components: {
    TagSelection,
    QuestionListItem,
    draggable,
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

#selected-question-list{
  min-height: 10rem;
}
</style>
