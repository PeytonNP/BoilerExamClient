<template>
  <div>
    <latex markdown :value="value.Content" />
    <ol :type="value.Combinations ? 'I' : 'A'">
      <li v-for="option in value.Options" :key="option">
        <latex :value="option" />
      </li>
    </ol>
    <ol type="A">
      <li v-for="(combination, index) in value.Combinations" :key="index">
        {{formatCombination(combination)}}
      </li>
    </ol>
  </div>

</template>

<script>
import Latex from './Latex'
import { IndexToRoman } from '../utils'

export default {
  name: 'QuestionPreview',
  props: ['value'],
  methods: {
    formatCombination (combination) {
      const total = this.value.Options.length
      if (combination.length >= total) {
        return 'All of them'
      } else if (combination.length === 0) {
        return 'None of them'
      }
      combination = combination
        .concat()
        .sort((a, b) => a - b)
      return combination
        .map(a => IndexToRoman(a + 1))
        .join(', ')
    }
  },
  components: {
    Latex
  }
}
</script>

<style scoped>

</style>
