<template>
  <b-container>
    <b-row class="my-4">
      <b-col>
        <b-form>
          <b-form-group
            id="title"
            label="Title:"
            label-for="title-input"
          >
            <b-form-input id="title-input" v-model.trim="form.title"/>
          </b-form-group>
          <b-form-group
            id="description"
            label="Description:"
            label-for="des-input"
          >
            <b-form-textarea id="des-input" v-model="form.description"/>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col>
        <b-list-group>
          <b-list-group-item v-if="form.examQuestions.length === 0">
            The list is empty
          </b-list-group-item>
          <question-list-item
            v-for="(examQuestion, index) in form.examQuestions"
            :question="examQuestion.question"
            :key="examQuestion.question.id">
            <div slot="actions" @click.stop.prevent class="mt-3">
              <b-form-group horizontal
                            class="d-inline my-0"
                            :label-cols="2"
                            label-size="sm"
                            label="Points">
                <b-input type="number" v-model="examQuestion.points" size="sm"></b-input>
              </b-form-group>
              <b-btn
                size="sm"
                class="float-right"
                @click="removeExamQuestion(index)"
                variant="danger">Delete</b-btn>
            </div>
          </question-list-item>
        </b-list-group>
        <b-btn class="float-right my-3" variant="primary" @click="addQuestions">Add</b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QuestionListItem from '@/components/QuestionListItem'
export default {
  name: 'ExamDetail',
  data: () => ({
    form: {
      id: 'testID',
      title: '',
      description: '',
      examQuestions: []
    }
  }),
  mounted () {
    console.log(this.editingExam && this.editingExam.id)
    if (this.editingExam && (this.editingExam.id === this.examID)) {
      this.form = this.editingExam
    } else {
      // fetch from server
    }
  },
  methods: {
    addQuestions () {
      this.$store.commit('editExam', this.form)
      this.$router.push({ name: 'library' })
    },
    removeExamQuestion (index) {
      this.form.examQuestions.splice(index, 1)
    },
  },
  computed: {
    examID () {
      return this.$route.params['examID']
    },
    editingExam () {
      return this.$store.state.editingExam
    }
  },
  components: {
    QuestionListItem,
  }
}
</script>

<style scoped>

</style>
