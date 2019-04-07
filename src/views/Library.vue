<template>
  <div class="library container">
    <br>
    <h2>Question Catalog</h2>
    <tag-selection
      id="form-question-tags"
      v-model="filters.tags"/>
  <div class="my-3">
    <b-button-group size="">
      <b-button variant="custom-lightblue" @click="createNew">Create New Question</b-button>
    </b-button-group>
  </div>

  <div class="">
    <table class="table table-bordered" style="width:100%">
      <tbody>
        <tr v-for="question in questions" :key="question.Id">
          <td><button class="btn" @click="currentPreview = question"><i class="fas fa-ellipsis-v"></i></button></td>
          <td>
            <span v-for="tag in question.Tags" class="badge mx-1" :class="filters.tags.some(a => a.Id === tag.Id) ? 'badge-primary' : 'badge-secondary'" v-text="tag.Title" />
          </td>
            <td><p v-text="question.Content" /></td>
            <td>
              <router-link :to="{name: 'question', params: {'questionID': question.Id}}" class="btn">
                <i class="fas fa-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-pagination :total-rows="totalNum" :per-page="20" v-model="currentPage" />

    <div class="inner">

      <b-modal id="actionModal" size="" title="Question ID" :visible="currentPreview !== null" @hidden="currentPreview=null">
        <question-preview v-if="currentPreview" :value="currentPreview"></question-preview>
        <template slot="modal-footer" v-if="currentPreview">
          <b-button
            variant="success"
            @click="addToCart(currentPreview)"
            :disabled="editingExam === null"
          ><i class="fas fa-shopping-cart mr-1"/>Add to Cart</b-button>
          <b-button variant="secondary" @click="clone(currentPreview)"><i class="fas fa-copy mr-1"/>Clone</b-button>
          <router-link
            :to="{name: 'question', params: {'questionID': currentPreview.Id}}"
            class="btn btn-primary">
            <i class="fas fa-edit mr-1"/>Edit
          </router-link>
        </template>
      </b-modal>
    </div>

  </div>
</template>

<script>
import axios from '@/utils/client'
import TagSelection from '../components/TagSelection'
import QuestionPreview from '../components/QuestionPreview'
import { mapState } from 'vuex'
export default {
  name: 'Library',
  data () {
    return {
      currentPage: 1,
      questions: [],
      totalNum: 10,
      filters: {
        tags: []
      },
      currentPreview: null,
    }
  },
  components: {
    TagSelection,
    QuestionPreview,
  },
  mounted () {
    const page = this.$route.query.page || 1
    this.toPage(page)
      .then(() => {
        this.currentPage = page
      })
  },
  methods: {
    toPage (page) {
      if (page === undefined) page = this.currentPage
      const params = new URLSearchParams()
      params.append('page', page)
      if (this.filters.tags && this.filters.tags.length > 0) {
        params.append('tags', this.filters.tags.map(tag => tag.Id).join(','))
      }
      return axios.get('/questions', {
        params: params
      })
        .then(res => {
          this.questions = res.data.data
          this.totalNum = res.data.totalEntries
        })
    },
    clone (originalQuestion) {
      let data = {
        ...originalQuestion,
        'Tags': originalQuestion.Tags.map(t => t.Id),
        'ParentId': originalQuestion.Id
      }
      delete data.Id
      return axios.post('/questions', data)
        .then(res => {
          this.$router.push({ name: 'question', params: { questionID: res.data.Id } })
        })
    },
    createNew () {
      return axios.post('/questions', {
        Options: ['Sample Option'],
        Answer: 0
      })
        .then(res => {
          this.$router.push({ name: 'question', params: { questionID: res.data.Id } })
        })
    },
    addToCart (question) {
      this.$store.commit('addExamQuestion', { element: question, newIndex: 0 })
      this.currentPreview = null
      this.$store.dispatch('saveEditingExam')
    }
  },
  watch: {
    currentPage (page, oldPage) {
      console.log(page, oldPage)
      if (page === parseInt(oldPage)) {
        return
      }
      this.toPage(page)
        .then(() => {
          this.$router.replace({ query: { page: page } })
        })
    },
    'filters.tags' () {
      this.currentPage = 1
      this.toPage()
    }
  },
  computed: mapState(['editingExam'])
}
</script>
