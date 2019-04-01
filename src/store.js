import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import client from './utils/client'

export default new Vuex.Store({
  state: {
    editingExam: null,
  },
  mutations: {
    editExam (state, exam) {
      state.editingExam = exam
    },
    addExamQuestion (state, { element, newIndex }) {
      if (!state.editingExam) {
        return
      }
      state.editingExam.ExamQuestions.splice(newIndex, 0, {
        points: 10,
        question: element
      })
    },
    removeExamQuestion (state, index) {
      state.editingExam.ExamQuestions.splice(index, 1)
    }
  },
  actions: {
    saveEditingExam ({ state }) {
      client.put(`/Exams/${state.editingExam.Id}`, state.editingExam)
        .then(res => {
          console.log(res.data)
        })

    }
  }
})
