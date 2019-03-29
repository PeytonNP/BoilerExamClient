<template>
  <b-container>
    <b-row class="my-4">
      <b-col>
        <div class="pb-5">
          <exam-basic-info v-model="form" />
          <b-button variant="primary" @click="saveForm">Save</b-button>
        </div>
        <b-list-group>
          <b-list-group-item v-if="form.ExamQuestions.length === 0">
            The list is empty
          </b-list-group-item>
          <draggable v-model="form.ExamQuestions" :options="{ animation: 150 }" >
            <question-list-item
              v-for="(examQuestion, index) in form.ExamQuestions"
              :question="examQuestion.question"
              :key="examQuestion.question.id">
              <div slot="actions" @click.stop.prevent class="mt-3">
                <b-form-group horizontal
                              class="d-inline my-0"
                              label-size="sm"
                              label="Points">
                  <b-input type="number" v-model.number="examQuestion.points" size="sm"></b-input>
                </b-form-group>
                <b-btn
                  size="sm"
                  class="float-right"
                  @click="removeExamQuestion(index)"
                  variant="danger">Delete</b-btn>
              </div>
            </question-list-item>
          </draggable>
        </b-list-group>
        <b-btn class="float-right my-3" variant="primary" @click="addQuestions">Add</b-btn>
      </b-col>
      <b-col>
        <b-card no-body header="Statistics" class="my-3">
          <canvas class="card-img-top" ref="stat-chart"/>
          <b-list-group flush>
            <b-list-group-item>
              Total Score: {{form.ExamQuestions.map(examQuestion => examQuestion.points).reduce((x, y) => x + y, 0)}}
            </b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card no-body header="Publish" class="my-3">
          <b-list-group flush>
            <b-list-group-item>
              Version A
            </b-list-group-item>
          </b-list-group>
          <b-card-body>
            <b-form class="card-text">
              <b-form-group label-cols
                            label-size="sm"
                            label="Versions">
                <b-input type="number" size="sm"></b-input>
              </b-form-group>
              <b-btn variant="primary" class="float-right">Publish</b-btn>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Chart from 'chart.js'
import draggable from 'vuedraggable'
import QuestionListItem from '@/components/QuestionListItem'
import ExamBasicInfo from '@/components/ExamBasicInfo'
import client from '@/utils/client'
import moment from 'moment'
export default {
  name: 'ExamDetail',
  data: () => ({
    form: {
      Id: 'testID',
      Title: '',
      Description: '',
      Time: new Date(),
      ExamQuestions: []
    }
  }),
  async mounted () {
    if (this.editingExam && (this.editingExam.id === this.examID)) {
      this.form = this.editingExam
    } else {
      const data = await client.get(`/Exams/${this.$route.params.examID}`).then(res => res.data)
      console.log(data)
      this.form.Id = data.Id
      this.form.Title = data.Title
      this.form.Description = data.Description
      this.form.Time = moment(data.Time).toDate()
    }

    const tagMap = getTagMap(this.form.ExamQuestions)
    this.chart = new Chart(this.$refs['stat-chart'], {
      data: {
        datasets: [{
          data: Array.from(tagMap.values()),
          backgroundColor: Array.from({ length: tagMap.size }, () => randomColor()),
        }],
        labels: Array.from(tagMap.keys())
      },
      type: 'polarArea',
    })
  },
  methods: {
    addQuestions () {
      this.$store.commit('editExam', this.form)
      this.$router.push({ name: 'library' })
    },
    removeExamQuestion (index) {
      this.form.ExamQuestions.splice(index, 1)
    },
    saveForm () {
      const data = {
        ...this.form,
        'Time': moment(this.form.Time).format()
      }
      client.put(`/Exams/${this.form.Id}`, data)
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
  watch: {
    'form.ExamQuestions': {
      handler () {
        const tagMap = getTagMap(this.form.ExamQuestions)
        this.chart.data.datasets.forEach((dataset) => {
          dataset.data = Array.from(tagMap.values())
        })
        this.chart.update()
      },
      deep: true,
    }
  },
  components: {
    QuestionListItem,
    draggable,
    ExamBasicInfo,
  }
}

function randomColor () {
  return `rgb(${Array.from({ length: 3 }, () => Math.round(Math.random() * 255))})`
}

function getTagMap (examQuestions) {
  const tagMap = new Map()
  examQuestions.forEach(examQuestion => {
    examQuestion.question.tags.forEach(tag => {
      const key = tag.title
      const originalPoints = tagMap.has(key) ? tagMap.get(key) : 0
      tagMap.set(key, originalPoints + examQuestion.points)
    })
  })
  return tagMap
}
</script>
