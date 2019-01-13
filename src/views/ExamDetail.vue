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
        <b-btn class="float-right" @click="addQuestions">Add</b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ExamDetail',
  data: () => ({
    form: {
      title: '',
      description: '',
      examQuestions: []
    }
  }),
  methods: {
    addQuestions () {
      this.$store.commit('editExam', this.form)
      this.$router.push({ name: 'library' })
    },
  },
}
</script>

<style scoped>

</style>
