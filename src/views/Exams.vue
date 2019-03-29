<template>
  <div>
    <div class="">
      <br>&nbsp;&nbsp;
      <b-btn v-b-modal.examInfoModal variant="custom-orange">Create New Exam</b-btn>

      <!-- Modal Component -->
      <b-modal id="examInfoModal" ref="infoModal" title="Exam Basic Information">
        <p>Note: Can edit information later</p>
        <exam-basic-info :value="form" />

        <b-btn size="sm" class="float-right" type="reset" variant="danger" v-on:click="resetForm">
        Reset</b-btn><br>
        <div slot="modal-footer" class="w-100">
         <b-btn size="sm" class="" variant="custom-yellow" v-on:click="hideModal">Cancel</b-btn>
         <b-btn size="sm" class="float-right" variant="custom-darkblue"
         @click="addNewExam">Continue</b-btn>
       </div>
      </b-modal>
</div>

<br><br>
<b-container>
  <b-row class="py-5">
    <b-col>
      <b-list-group>
        <b-list-group-item :to="{ name: 'exam', params: { examID: exam.Id } }" v-for="exam in exams" :key="exam.Id">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1" v-text="exam.Title" />
            <small v-text="time(exam.Time)"/>
          </div>
          <p v-text="exam.Description" />
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
import ExamBasicInfo from '@/components/ExamBasicInfo'
import client from '@/utils/client'
import moment from 'moment'
export default {
  name: 'Exams',
  data: () => ({
    form: {
      Title: '',
      Description: '',
      Time: new Date(),
      ExamQuestions: []
    },
    exams: []
  }),
  async mounted () {
    const data = await client.get('/Exams').then(res => res.data)
    this.exams = data
    console.log(this.exams)
  },
  methods: {
    hideModal () {
      this.$refs.infoModal.hide()
    },
    resetForm () {
      document.getElementById('examForm').reset()
    },
    addNewExam () {
      const data = {
        ...this.form,
      }
      console.log(data)
      client.post('/Exams', data)
        .then((res) => {
          const id = res.data.Id
          this.$router.push({ name: 'exam', params: { examID: id } })
        })
    },
    time (time) {
      return moment(time).calendar()
    }
  },
  components: {
    ExamBasicInfo,
  }
}
</script>
