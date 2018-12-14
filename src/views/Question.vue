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
          <b-form-group id="form-options-group"
                        label="Options:">
            <b-list-group v-if="form.options && form.options.length > 0">
              <b-list-group-item v-for="(option, index) in form.options" :key="index">
                <b-input-group :prepend="String.fromCharCode(65 + index)" >
                  <b-form-input type="text"
                                v-if="typeof option === 'string'"
                                :disabled="freezed"
                                v-model="form.options[index]"/>
                  <b-input-group-append>
                    <b-btn variant="danger" @click="form.options.splice(index, 1)">-</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-list-group-item>
            </b-list-group>
            <b-btn variant="primary" class="float-right my-2" @click="form.options.push('')">Add</b-btn>
          </b-form-group>
          <b-form-group id="form-combinations-group"
                        label="Combinations:">
            <b-list-group v-if="form.combinations && form.combinations.length > 0">
              <b-list-group-item v-for="(combination, index) in form.combinations" :key="index">
                <b-button-group class="btn-block">
                  <b-btn
                    class="col"
                    v-for="(option, index) in form.options"
                    @click="combination.includes(index) ? combination.splice(combination.indexOf(index), 1) : combination.push(index)"
                    :variant="combination.includes(index) ? 'primary' : 'outline-secondary'"
                    :key="index">{{String.fromCharCode(index + 65)}}</b-btn>
                  <b-btn @click="form.combinations.splice(index, 1)">-</b-btn>
                </b-button-group>
              </b-list-group-item>
            </b-list-group>
            <b-btn variant="primary" class="float-right my-2" @click="form.combinations.push([])">Add</b-btn>
          </b-form-group>
          <b-form-group id="form-answer-group"
                        label="Answer:"
                        label-for="form-answer">
            <b-form-select id="form-answer"
                           :disabled="freezed"
                           :options="form.options.map((option, index) => String.fromCharCode(65 + index) + '. ' + option)"
                           v-model="form.answer"/>
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
      answer: null,
      options: ['a'],
      combinations: [],
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
      return this.form.content +
        '\n\n<ol type="A">' +
        this.form.options
          .map(answer => `<li>${answer}</li>`)
          .join('\n\n') +
        this.form.combinations
          .map(combination => `<li>${combination.map(a => String.fromCharCode(65 + a)).join(', ')}</li>`)
          .join('\n\n') +
        '</ol>'
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
  #form-options-group .list-group .list-group-item {
    padding: 0;
    input.form-control {
      border-style: none;
    }
    .input-group-text {
      border-style: none;
      border-radius: 0;
      width: 2.25rem;
      text-align: center;
    }
  }
  #form-combinations-group .list-group .list-group-item {
    padding: 0;
  }
</style>
