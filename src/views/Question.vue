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
              <b-list-group-item v-for="(combination, i) in form.combinations" :key="i">
                <b-nav fill pills>
                  <b-nav-item
                    v-for="(option, index) in form.options"
                    :key="index"
                    :active="combinationOptionActive(combination, index)"
                    @click="toggleCombination(combination, index)"
                  >
                    {{String.fromCharCode(index + 65)}}
                  </b-nav-item>
                </b-nav>
              </b-list-group-item>
            </b-list-group>
            <b-btn-group class="float-right my-2">
              <b-btn variant="success"  @click="toggleMode(true)" v-if="form.combinations === null">Enable</b-btn>
              <template v-else>
                <b-btn variant="primary" @click="form.combinations.push([])">Add</b-btn>
                <b-btn variant="danger" @click="toggleMode(false)">Disable</b-btn>
              </template>
            </b-btn-group>
          </b-form-group>
          <b-form-group id="form-answer-group"
                        label="Answer:"
                        label-for="form-answer">
            <b-form-select id="form-answer"
                           :disabled="freezed"
                           :options="answerSelections"
                           value-field="index"
                           text-field="text"
                           v-model="form.answer"/>
          </b-form-group>
          <b-form-group id="form-question-tags-group"
                        label="Tags:"
                        label-for="form-question-tags"
                        description="The Tags for this question">
            <tag-selection
              id="form-question-tags"
              v-model="form.tags"/>
          </b-form-group>
          <b-button-group>
            <b-button
              @click="onSave"
              variant="primary"
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
        <question-preview :value="form" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TagSelection from '@/components/TagSelection'
import QuestionPreview from '@/components/QuestionPreview'
import { Status } from '../models/question'
import client from '@/utils/client'
import { IndexToLetter } from '@/utils'
export default {
  name: 'Question',
  data: () => ({
    form: {
      content: '',
      answer: null,
      options: [],
      combinations: null,
      tags: [],
      status: Status.draft,
    },
  }),
  mounted () {
    client.get('/questions/' + this.questionID)
      .then(response => {
        this.form = response.data
        console.log(this.form)
      })
  },
  methods: {
    onSave () {
      const data = Object.assign({}, this.form)
      data.tags = data.tags.map(tag => tag.id)
      console.log(data)
      client.put('/questions/' + this.questionID, data)
    },
    searchTags () {
      // async find the appropriate tags
    },
    combinationOptionActive (combination, index) {
      return combination.includes(index)
    },
    /**
     * Switch between combination mode and option mode
     * @param {boolean}mode true for combination and false for option
     */
    toggleMode (mode) {
      this.form.answer = 0
      if (mode) {
        this.form.combinations = this.modeBuffer || []
      } else {
        this.modeBuffer = this.form.combinations
        this.form.combinations = null
      }
    },
    toggleCombination (combination, index) {
      if (this.combinationOptionActive(combination, index)) { combination.splice(combination.indexOf(index), 1) } else { combination.push(index) }
    }
  },
  computed: {
    freezed () {
      return this.form.status === Status.approved
    },
    answerSelections () {
      if (this.form.combinations === null) {
        return this.form.options.map((option, index) => ({
          text: IndexToLetter(index) + '. ' + option,
          index: index,
          type: 'options'
        }))
      } else {
        return this.form.combinations.map((combination, index) => {
          const selection = {
            index: index,
            type: 'combinations'
          }
          if (combination.length === 0) {
            selection.text = 'None'
          } else {
            selection.text = combination.map(index => IndexToLetter(index)).join(', ')
          }
          return selection
        })
      }
    },
    questionID () {
      return parseInt(this.$route.params.questionID)
    }
  },
  watch: {
    'form.answer' (value) {
      console.log(value)
    }
  },
  components: {
    TagSelection,
    QuestionPreview,
  }
}
</script>

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
    padding: 0.3rem;
    .nav .nav-item{
      margin: 0.2rem;
    }
  }
</style>
