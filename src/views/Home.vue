<template>
  <div>
    <div class="inner">
      <br><p>Add B^e Custom Image</p>
    </div>

    <div class="inner">
      <b-container fluid>
        <p>Query list of courses available from the database (course titles as well?)</p>
      </b-container>

      <b-card
      header="What course(s) are you associated with?"
      align="center">

      <b-button-group vertical>
        <b-button v-for="btn in btnCourseList" :pressed.sync="btn.state" :variant="btn.variant">
          {{ btn.caption }}
        </b-button>
      </b-button-group>
      <p>Selected State: <strong>{{ btnStates }}</strong></p>
    </b-card>
  </div>

  <hr>
  <div class="">
    <h3>Redesign</h3>
    <h3>User is associated with at least one course and authenticated</h3>
    <p>"Pick up where you left off" / User Dashboard</p>

    <b-container>
      <b-card-group deck>
        <b-card header="Your Questions">
          <p class="card-text">Description</p>
          <b-list-group>
            <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
              Problem #ID - Course
              <b-badge variant="primary">Draft</b-badge>
            </b-list-group-item>

            <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
              Problem #ID - Course
              <b-badge variant="primary">Approved</b-badge>
            </b-list-group-item>

            <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
              Problem #ID - Course
              <b-badge variant="primary">Used on Exam</b-badge>
            </b-list-group-item>
          </b-list-group>
        </b-card>

        <b-card header="Your Exams">
          <p class="card-text">Description</p>

          <b-list-group>
            <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
              Exam Name
              <b-badge variant="info">Exam State</b-badge>
            </b-list-group-item>

            <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
              Exam Name
              <b-badge variant="info">Exam State</b-badge>
            </b-list-group-item>

            <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
              Exam Name
              <b-badge variant="info">Exam State</b-badge>
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
        { variant: 'primary', caption: 'MA 16010', state: false },
        { variant: 'primary', caption: 'MA 16020', state: false },
        { variant: 'primary', caption: 'MA 16100', state: false },
        { variant: 'primary', caption: 'MA 16200', state: false },
        { variant: 'primary', caption: 'MA 16600', state: false },
        { variant: 'primary', caption: 'MA 25000 - Linear Algebra', state: false },
        { variant: 'primary', caption: 'MA 26100 - Multivariate Calculus', state: false },
        { variant: 'primary', caption: 'MA 35100 - Elementary Linear Algebra', state: false },
        { variant: 'primary', caption: 'MA 36600 - Ordinary Differential Equations', state: false },
        { variant: 'primary', caption: 'MA 41600 - Probability', state: false }
      ]
    }
  },
  computed: {
    btnStates () {
      return this.btnCourseList.map(btn => btn.state)
    }
  }
}
</script>
