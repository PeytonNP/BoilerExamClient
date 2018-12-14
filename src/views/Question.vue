<template>
  <b-container class="py-4">
    <b-row>
      <b-col md="6">
        <b-form>
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
          <b-form-group id="form-answer-group"
                        label="Answer:"
                        label-for="form-answer">
            <b-form-input id="form-answer"
                          type="text"
                          :disabled="freezed"
                          v-model="form.answer"/>
          </b-form-group>
          <b-form-group id="form-distractor-group"
                        label="Distractors:">
            <b-list-group v-if="form.distractors && form.distractors.length > 0">
              <b-list-group-item v-for="(distractor, index) in form.distractors" :key="index">
                <b-input-group>
                  <b-form-input type="text"
                                :disabled="freezed"
                                v-model="form.distractors[index]"/>
                  <b-input-group-append>
                    <b-btn variant="danger" @click="form.distractors.splice(index, 1)">-</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-list-group-item>
            </b-list-group>
            <b-btn variant="primary" class="my-2 float-right" @click="form.distractors.push('')">Add</b-btn>
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
        md="6">
        <latex :value="questionContent" />
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
      content: '',
      answer: '',
      distractors: ['a'],
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
    questionContent () {
      let options = this.form.distractors.slice(0)
      options.unshift(this.form.answer)
      options = options.map(answer => `<li>${answer}</li>`)
      return this.form.content + '\n\n<ol type="A">' + options.join('\n\n') + '</ol>'
    },
  },
  components: {
    Multiselect,
    Latex,
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  #form-distractor-group .list-group .list-group-item {
    padding: 0;
    input.form-control {
      border-style: none;
    }
  }
</style>
