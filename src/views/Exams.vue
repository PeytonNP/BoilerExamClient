<template>
  <div>

    <p>Which input needs to be required?</p>

    <div class="">
      <br>&nbsp;&nbsp;
      <b-btn v-b-modal.examInfoModal variant="custom-orange">Create New Exam</b-btn>

      <!-- Modal Component -->
      <b-modal id="examInfoModal" ref="infoModal" title="Exam Basic Information">
        <p>Note: Can edit information later</p>
        <div>
          <b-form id="examForm">
            <b-form-group horizontal
              id="fieldset1"
              label="Exam Name"
              label-for="examNameInput">
              <b-form-input
                id="examNameInput"
                placeholder="e.g. Dr. Mummert"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group horizontal
              id="semesterLabel"
              label="Semester"
              label-for="semesterInput">
              <b-form-input
                id="semesterInput"
                placeholder="e.g. Spring 2019"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group horizontal
              id="courseSelect"
              label="Course Name"
              label-for="courseDropdown"
              description="get list of courses for user">
              <b-form-select class="" id="courseDropdown">
                <option value="null">Please select an option</option>
                <option value="a">Course A</option>
                <option value="b">Course B</option>
                <option value="c">Course C</option>
                <option value="d">Course D</option>
              </b-form-select>
            </b-form-group>

            <b-form-group horizontal
              id="sectionLabel"
              label="Section"
              label-for="sectionInput">
              <b-form-input
                id="sectionInput"
                placeholder="e.g. Section01"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group horizontal
              id="exportLabel"
              label="Export Name"
              label-for="exportInput"
              description="This will be the filename when exporting the exam.">
              <b-form-input
                id="exportInput"
                placeholder="e.g. MA265Midterm2Spring2019"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group horizontal
              id="dateLabel"
              label="Exam Date"
              label-for="dateInput">
              <b-form-input
                id="dateInput"
                type="date"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group horizontal
              id="timeLabel"
              label="Exam Time"
              label-for="timeInput">
              <b-form-input
                id="timeInput"
                type="time"
                required>
              </b-form-input>
            </b-form-group>

          </b-form>
        </div>

        <b-btn size="sm" class="float-right" type="reset" variant="danger" v-on:click="resetForm">
        Reset</b-btn><br>
        <div slot="modal-footer" class="w-100">
         <b-btn size="sm" class="" variant="custom-yellow" v-on:click="hideModal">Cancel</b-btn>
         <b-btn size="sm" class="float-right" variant="custom-darkblue"
         :to="{ name: 'cart' }">Continue</b-btn>
       </div>
      </b-modal>
</div>

<br><br>
<h5>List exams the user already created</h5>
<b-container>
  <b-row class="py-5">
    <b-col>
      <b-list-group>
        <b-list-group-item :to="{ name: 'exam', params: { examID: 'testID' } }">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">MA261 - Fall18</h5>
            <small>3 days ago</small>
          </div>
          <p class="mb-1">
            <b-badge>Tested</b-badge>
            12 Questions
          </p>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</b-container>
</div>

</template>

<script>
export default {
  name: 'Exams',
  methods: {
    hideModal: function () {
      this.$refs.infoModal.hide()
    },
    resetForm: function () {
      document.getElementById('examForm').reset()
    }
  }
}
</script>
