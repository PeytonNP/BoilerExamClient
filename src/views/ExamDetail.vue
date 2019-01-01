<template>
  <b-container>
    <b-row>
      <b-col class="my-4">
        <b-form>
          <b-form-group
            id="title"
            label="Title:"
            label-for="title-input"
          >
            <b-form-input id="title-input" v-model.trim="form.title"/>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ExamDetail',
  data: () => ({
    form: {
      title: ''
    }
  })
}
</script>

<style scoped>

</style>
