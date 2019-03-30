<template>
  <div class="library container">
    <br>
    <h2>Question Catalog</h2>
    <tag-selection
      id="form-question-tags"
      v-model="filters.tags"/>
  <div class="my-3">
    <b-button-group size="">
      <b-button variant="custom-lightblue">Create New Question</b-button>
      <b-button variant="custom-lightblue">Create New Exam</b-button>
      <b-button variant="custom-lightblue">View Exam Cart</b-button>
    </b-button-group>
  </div>

  <div class="">
    <table class="table table-bordered" style="width:100%">
      <tbody>
        <tr v-for="question in questions" :key="question.Id">
          <td><button class="btn" v-b-modal.actionModal><i class="fas fa-ellipsis-v"></i></button></td>
          <td>
            <span v-for="tag in question.Tags" class="badge mx-1" :class="filters.tags.find(a => a.Id === tag.Id) ? 'badge-primary' : 'badge-secondary'" v-text="tag.Title" />
          </td>
            <td><p v-text="question.Content" /></td>
            <td>
              <router-link :to="{name: 'question', params: {'questionID': question.Id}}" class="btn" >
                <i class="fas fa-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-pagination :total-rows="totalNum" :per-page="20" v-model="currentPage">

    </b-pagination>

    <div class="inner">

      <b-modal id="actionModal" size="" title="Question ID">
        Viewing more info about the problem
        <p>Describe a list of actions the user can take</p>
        <p>Select one of the following actions</p>
        <b-list-group>
          <b-list-group-item href="#"><i class="fas fa-copy"></i>
          Clone - Copy this problem to my problems</b-list-group-item>
          <b-list-group-item href="#"><i class="fas fa-shopping-cart"></i>
          Cart - Add this problem to my exam cart</b-list-group-item>
          <b-list-group-item href="#">
          Other action</b-list-group-item>
          <b-list-group-item href="#" disabled><i class="fas fa-user-edit"></i>
          Edit - Cannot edit another user's problem</b-list-group-item>
        </b-list-group>
      </b-modal>
    </div>

  </div>
</template>

<script>
import axios from '@/utils/client'
import TagSelection from '../components/TagSelection'
export default {
  name: 'Library',
  data () {
    return {
      currentPage: 1,
      questions: [],
      totalNum: 10,
      value: [],
      filters: {
        tags: []
      }
    }
  },
  components: {
    TagSelection,
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
      this.toPage()
    }
  }
}
</script>
