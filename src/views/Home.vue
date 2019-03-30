<template>
  <div>
    <div class="inner">
      <br>
      <!--<b-card title="Your Information" align="center">
      <b-button-group vertical>
        <p> TODO and REMOVE (Home.vue): populate with user info / courses in db</p>
        <b-button v-for="btn in btnCourseList" :pressed.sync="btn.state" :variant="btn.variant">
          {{ btn.caption }}
        </b-button>
      </b-button-group>
    </b-card>-->
  </div>

  <div class="">
    <b-container>
      <b-card-group deck>
        <b-card header="Your Questions">
          <b-list-group>

            <b-list-group-item href="#" v-for="question in questionList" class="d-flex justify-content-between align-items-center">
              {{ question.questionID }}
              <b-badge variant="custom-orange">{{ question.course }}</b-badge>
            </b-list-group-item>

          </b-list-group>
        </b-card>

        <b-card header="Your Exams">
          <b-list-group>
            <b-list-group-item href="#" v-for="exam in examList" class="d-flex justify-content-between align-items-center">
              {{ exam.examID }} - {{ exam.title }}
              <b-badge variant="custom-lightblue">{{ exam.status }}</b-badge>
            </b-list-group-item>

          </b-list-group>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      myToggle: false,
      toggleMA161: false,
      btnCourseList: [
        { variant: 'custom-yellow', caption: 'MA 16010', state: false },
        { variant: 'custom-yellow', caption: 'MA 16020', state: false },
        { variant: 'custom-yellow', caption: 'MA 16100', state: false },
        { variant: 'custom-yellow', caption: 'MA 16200', state: false },
        { variant: 'custom-yellow', caption: 'MA 16600', state: false },
        { variant: 'custom-yellow', caption: 'MA 25000 - Linear Algebra', state: false }],
      questionList:
      [{ variant: 'custom-lightblue', questionID: 'Question 1', course: 'MA261' }],
      examList:
      [{ variant: 'custom-yellow', examID: 'Exam 1', title: 'Name', status: 'Draft' }]
    }
  },
  computed: {
    btnStates () {
      return this.btnCourseList.map(btn => btn.state)
    }
  }
}
</script>
