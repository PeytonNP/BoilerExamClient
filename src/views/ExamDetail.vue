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
                <b-input type="number" v-model.number="examQuestion.points" size="sm"></b-input>
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
      <b-col>
        <b-card no-body header="Statistics">
          <canvas class="card-img-top" ref="stat-chart"/>
          <b-list-group flush>
            <b-list-group-item>
              Total Score: {{form.examQuestions.map(examQuestion => examQuestion.points).reduce((x, y) => x + y, 0)}}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Chart from 'chart.js'
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
    if (this.editingExam && (this.editingExam.id === this.examID)) {
      this.form = this.editingExam
    } else {
      // fetch from server
    }

    const tagMap = getTagMap(this.form.examQuestions)
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
  watch: {
    'form.examQuestions': {
      handler () {
        const tagMap = getTagMap(this.form.examQuestions)
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
