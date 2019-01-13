import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editingExam: null,
  },
  mutations: {
    editExam (state, exam) {
      state.editingExam = exam
    },
    addExamQuestion (state, question) {
      if (!state.editingExam) {
        return
      }
      state.editingExam.examQuestions.push({
        points: 10,
        question: question
      })
    },
    removeExamQuestion (state, index) {
      state.editingExam.examQuestions.splice(index, 1)
    }
  },
  actions: {

  }
})
