<template>
  <b-container class="py-4">
    <b-row>
      <b-col md="3">
        <b-card header="Card Title">
          <p class="card-text">
            <multiselect
              id="form-question-tags"
              v-model="filters.tags"
              :options="tags"
              multiple
              searchable
              :disabled="freezed"
              @search-change="searchTags"/>
          </p>
        </b-card>
      </b-col>
      <b-col md="9">
        <b-list-group>
          <b-list-group-item
            v-for="question in questions"
            :key="question.id"
            :to="{ name: 'question', params: { questionID: 'a' }}">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1" v-text="question.title" />
              <small>3 days ago</small>
            </div>
            <p class="mb-1" v-text="question.content"/>
            <div class="library-badge-container">
              <b-badge
                v-for="tag in question.tags"
                :key="tag"
                :variant="filters.tags && filters.tags.length > 0 ? filters.tags.contains(tag) : 'primary'">
                {{ tag }}
              </b-badge>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { Status } from '../models/question'

export default {
  name: 'Library',
  data: () => ({
    questions: [
      {
        id: 0,
        title: 'Question 1',
        content: 'Some Latex Content',
        tags: ['Vector', 'Green Theorem'],
        status: Status.draft,
      },
      {
        id: 1,
        title: 'Question 2',
        content: 'Some Latex Content',
        tags: ['Vector', 'Green Theorem'],
        status: Status.submitted,
      },
      {
        id: 2,
        title: 'Question 3',
        content: 'Some Latex Content',
        tags: ['Vector', 'Green Theorem'],
        status: Status.approved,
      },
    ],
    page: 0,
    filters: {
      tags: [],
    }
  }),
  components: {
    Multiselect,
  }
}
</script>

<style lang="scss">
.library-badge-container {
  .badge {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
