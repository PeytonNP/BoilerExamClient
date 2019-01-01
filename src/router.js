import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/questions',
      name: 'library',
      component: () => import('@/views/Library.vue')
    },
    {
      path: '/questions/:questionID',
      name: 'question',
      component: () => import('@/views/Question.vue')
    },
    {
      path: '/exams',
      name: 'exams',
      component: () => import('@/views/Exams.vue')
    },
    {
      path: '/exams/:examID',
      name: 'exam',
      component: () => import ('@/views/ExamDetail.vue')
    }
  ]
})
