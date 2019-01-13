<template>
  <b-list-group-item
    :to="{ name: 'question', params: { questionID: question.id }}">
    <latex inline class="mb-1" :value="question.content"/>
    <div class="library-badge-container">
      <b-badge
        v-for="tag in question.tags"
        :key="tag.id"
        :variant="tags && tags.some(t => t.id === tag.id) ? 'primary' : 'secondary'">
        {{ tag.title }}
      </b-badge>
      <slot name="action-btn"></slot>
    </div>
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
