<template>
  <b-container class="py-4">
    <b-row>
      <b-col md="6">
        <b-form>
          <b-form-group id="form-title-group"
                        label="Title:"
                        label-for="form-title-input"
                        description="An optional title for the question">
            <b-form-input id="form-title-input"
                          type="text"
                          :disabled="freezed"
                          v-model="form.title">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-question-content-group"
                        label="Question Content:"
                        label-for="form-question-content"
                        description="The LaTeX string of the question">
            <b-form-textarea id="form-question-content"
                             v-model="form.content"
                             :disabled="freezed"
                             :rows="3"
                             :max-rows="6">
            </b-form-textarea>
          </b-form-group>
          <b-form-group id="form-question-tags-group"
                        label="Tags:"
                        label-for="form-question-tags"
                        description="The Tags for this question">
            <multiselect
              id="form-question-tags"
              v-model="form.tags"
              :options="tags"
              multiple
              searchable
              :disabled="freezed"
              @search-change="searchTags"/>
          </b-form-group>
          <b-button-group>
            <b-button
              @click="onSubmit()"
              variant="primary"
              :disabled="freezed">Submit</b-button>
            <b-button
              variant="secondary"
              :disabled="freezed"
            >Save</b-button>
            <b-button
              variant="danger"
              :disabled="freezed"
              >Delete</b-button>
          </b-button-group>
        </b-form>
      </b-col>
      <b-col
        md="6"
        class="d-flex flex-column justify-content-center align-items-center">
        <latex :value="form.content" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Latex from '@/components/Latex'
import { Status } from '../models/question'

export default {
  name: 'Question',
  data: () => ({
    form: {
      title: '',
      content: '',
      tags: [],
      status: Status.draft,
    },
    tags: ['Green Theorem', 'Vectors'],
  }),
  methods: {
    onSubmit () {
    },
    searchTags () {
      // async find the appropriate tags
    },
  },
  computed: {
    freezed () {
      return this.form.status === Status.approved
    },
  },
  components: {
    Multiselect,
    Latex,
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
  #question-preview {
    max-height: 100vh;
  }
</style>
