<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="custom-darkgrey">
        <b-navbar-brand :to="{ name: 'home' }">Boiler Exam</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown text="Library">
              <b-dropdown-item :to="{ name: 'library' }">Question Catalog</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'metrics' }" disabled>Metrics</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item :to="{ name: 'problems' }">Problem Editor</b-nav-item>
            <b-nav-item :to="{ name: 'exams' }">Exams</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              v-if="editingExam"
              :to="{ name: 'exam', params: { examID: editingExam.Id } }">
              <i class="fas fa-shopping-cart fa-lg"></i>
              {{editingExam.Title}}
              <b-badge variant="info" v-text="editingExam.ExamQuestions.length" />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: mapState([
    'editingExam',
  ])
}
</script>

<style lang="scss">
@import './styles/boilercustom';
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/dist/bootstrap-vue.css';

@import './styles/multiselect';

@import '~@fortawesome/fontawesome-free/css/all.css';
</style>
