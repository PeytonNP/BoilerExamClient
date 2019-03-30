<template>
  <div class="library container">
    <br>
    <h2>Question Catalog
      <multiselect v-model="value" :options="courseList" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Select Course(s)"
      label="name" track-by="name" :preselect-first="true">
      <template slot="" slot-scope=""><span class="multiselect__single">Filtering by Courses</span></template>
    </multiselect>

  </h2>

  <div class="">
    <br>
    <b-button-group size="">
      <b-button variant="custom-lightblue">Create New Question</b-button>
      <b-button variant="custom-lightblue">Create New Exam</b-button>
      <b-button variant="custom-lightblue">View Exam Cart</b-button>
    </b-button-group>
    <br><br>
  </div>

  <div class="">
    <table class="table table-bordered" style="width:100%">
      <tbody>
        <tr v-for="question in questions">
          <td><button class="btn" v-b-modal.actionModal><i class="fas fa-ellipsis-v"></i></button></td>
          <td><p v-text="question.Tags.map(a => a.Title).join('|')" /></td>
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
import Multiselect from 'vue-multiselect'
export default {
  name: 'Library',
  data () {
    return {
      currentPage: 1,
      questions: [],
      totalNum: 10,
      value: [],
      courseList: [
        { name: 'MA 265' },
        { name: 'Test' },
        { name: 'Test1' },
        { name: 'Linear' }
      ]
    }
  },
  components: {
    Multiselect
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
      return axios.get('/Questions', {
        params: { page: page }
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
    }
  }
}
</script>
