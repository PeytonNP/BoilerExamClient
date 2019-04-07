<template>
  <b-container class="py-4">
    <b-row>
      <b-col md="6">
        <b-form v-if="form">
          <b-form-group id="form-question-content-group"
                        label="Question Content:"
                        label-for="form-question-content"
                        description="The LaTeX string of the question">
            <b-form-textarea id="form-question-content"
                             v-model="form.Content"
                             :disabled="freezed"
                             :rows="3"
                             :max-rows="6">
            </b-form-textarea>
          </b-form-group>
          <b-card no-body>
            <b-card-body>
              <b-card-title>Attachments</b-card-title>
              <b-form-file
                v-model="selectedFile"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
              <b-button class="my-2 float-right" variant="primary" :disabled="selectedFile == null" @click="uploadFile">
                <i class="fas fa-file-upload mr-1"/>
                Upload
              </b-button>
            </b-card-body>
            <b-list-group flush>
              <b-list-group-item
                draggable="true"
                @dragstart="fileDrag($event, file)"
                v-for="file in form.Attachments"
                :key="file.Id">
                {{file.FileName}}
                <b-button class="float-right" size="sm" variant="outline-danger" @click="deleteFile(file)">
                  <i class="fas fa-trash"></i>
                </b-button>
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <b-form-group id="form-options-group"
                        label="Options:">
            <b-list-group v-if="form.Options && form.Options.length > 0">
              <b-list-group-item v-for="(option, index) in form.Options" :key="index">
                <b-input-group :prepend="String.fromCharCode(65 + index)" >
                  <b-form-input type="text"
                                v-if="typeof option === 'string'"
                                :disabled="freezed"
                                v-model="form.Options[index]"/>
                  <b-input-group-append>
                    <b-btn variant="danger" @click="form.Options.splice(index, 1)">
                      <i class="fas fa-minus"></i>
                    </b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-list-group-item>
            </b-list-group>
            <b-btn variant="primary" class="float-right my-2" @click="form.Options.push('')"><i class="fas fa-plus mr-2"></i>Add</b-btn>
          </b-form-group>
          <b-form-group id="form-combinations-group"
                        label="Combinations:">
            <b-list-group v-if="form.Combinations && form.Combinations.length > 0">
              <b-list-group-item v-for="(combination, i) in form.Combinations" :key="i">
                <b-nav fill pills>
                  <b-nav-item
                    v-for="(option, index) in form.Options"
                    :key="index"
                    :active="combinationOptionActive(combination, index)"
                    @click="toggleCombination(combination, index)"
                  >
                    {{String.fromCharCode(index + 65)}}
                  </b-nav-item>
                  <b-btn variant="danger" @click="form.Combinations.splice(index, 1)">
                    <i class="fas fa-minus"></i>
                  </b-btn>
                </b-nav>
              </b-list-group-item>
            </b-list-group>
            <b-btn-group class="float-right my-2">
              <b-btn variant="success"  @click="toggleMode(true)" v-if="form.Combinations === null"><i class="fas fa-plus-square mr-2"></i>Enable</b-btn>
              <template v-else>
                <b-btn variant="primary" @click="form.Combinations.push([])"><i class="fas fa-plus mr-2"></i>Add</b-btn>
                <b-btn variant="danger" @click="toggleMode(false)"><i class="fas fa-ban mr-2"></i>Disable</b-btn>
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
                           v-model="form.Answer"/>
          </b-form-group>
          <b-form-group id="form-question-tags-group"
                        label="Tags:"
                        label-for="form-question-tags"
                        description="The Tags for this question">
            <tag-selection
              id="form-question-tags"
              v-model="form.Tags"/>
          </b-form-group>
          <b-button-group>
            <b-button
              @click="onSave"
              variant="primary"
              :disabled="freezed"
            ><i class="fas fa-save mr-2"></i>Save</b-button>
            <b-button
              @click="onDelete"
              variant="danger"
              :disabled="freezed"
              ><i class="fas fa-trash mr-2"></i>Delete</b-button>
          </b-button-group>
        </b-form>
      </b-col>
      <b-col md="6">
        <question-preview v-if="form" :value="form" />
        <div v-if="form && form.Parent">
          This question was cloned from <router-link v-text="form.Parent.Id" :to="{name: 'question', params: {questionID: form.ParentId}}"/>:
          <question-preview :value="form.Parent" />
        </div>
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
    form: null,
    selectedFile: null,
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
      data.Tags = data.Tags.map(tag => tag.id)
      client.put('/questions/' + this.questionID, data)
    },
    onDelete () {
      client.delete('/questions/' + this.questionID)
      this.$router.back()
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
        this.form.Combinations = this.modeBuffer || []
      } else {
        this.modeBuffer = this.form.Combinations
        this.form.Combinations = null
      }
    },
    toggleCombination (combination, index) {
      if (this.combinationOptionActive(combination, index)) { combination.splice(combination.indexOf(index), 1) } else { combination.push(index) }
    },
    uploadFile () {
      if (!this.selectedFile) {
        return
      }
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      client.post(`/questions/${this.questionID}/attachments`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(res => {
          const metadata = res.data
          this.form.Attachments.push(metadata)
          this.selectedFile = null
        })
    },
    deleteFile (file) {
      client.delete(`/files/${file.Id}`)
        .then(res => {
          const index = this.form.Attachments.indexOf(file)
          this.form.Attachments.splice(index, 1)
        })
    },
    fileDrag (event, file) {
      const url = process.env.BASE_URL + 'api/files/' + file.Id
      event.dataTransfer.setData('text', `![${file.FileName}](${url})`)
    }
  },
  computed: {
    freezed () {
      return false
      // return this.form.Status === Status.approved
    },
    answerSelections () {
      if (this.form.Combinations === null) {
        return this.form.Options.map((option, index) => ({
          text: IndexToLetter(index) + '. ' + option,
          index: index,
          type: 'options'
        }))
      } else {
        return this.form.Combinations.map((combination, index) => {
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
