<template>
  <b-list-group-item
    :to="{ name: 'question', params: { questionID: question.Id }}">
    <latex inline class="mb-1" :value="question.Content"/>
    <div class="library-badge-container">
      <b-badge
        v-for="tag in question.Tags"
        :key="tag.Id"
        :variant="tags && tags.some(t => t.id === tag.id) ? 'primary' : 'secondary'">
        {{ tag.Title }}
      </b-badge>
      <slot name="action-btn"></slot>
    </div>
    <slot name="actions"></slot>
  </b-list-group-item>
</template>

<script>
import Latex from '@/components/Latex'
export default {
  name: 'QuestionListItem',
  props: {
    question: Object,
    tags: Array,
  },
  components: {
    Latex,
  }
}
</script>

<style scoped>

</style>
