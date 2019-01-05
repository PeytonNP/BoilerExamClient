<template>
  <latex :value="questionContent"></latex>
</template>

<script>
import Latex from './Latex'
import { IndexToRoman } from '../utils'

/**
 * @return {string}
 */
function HTMLAnswerList (list, type) {
  return `<ol type="${type || 'A'}">` +
  list
    .map(a => `<li>${a}</li>`)
    .join('') +
  '</ol>'
}

function FormatCombinations (combinations, total) {
  // combinations = combinations
  //   .concat() // shallow-copy the array
  //   .sort((a, b) => a.length - b.length)
  return combinations.map(combination => {
    if (combination.length >= total) {
      return 'All of them'
    } else if (combination.length === 0) {
      return 'None of them'
    }
    combination.sort((a, b) => a - b)
    return combination
      .map(a => IndexToRoman(a + 1))
      .join(', ')
  })
}

export default {
  name: 'QuestionPreview',
  props: ['value'],
  computed: {
    questionContent () {
      if (this.value.combinations === null) {
        return this.value.content + HTMLAnswerList(this.value.options, 'A')
      } else {
        return this.value.content +
          HTMLAnswerList(this.value.options, 'I') +
          HTMLAnswerList(FormatCombinations(this.value.combinations, this.value.options.length), 'A')
      }
    },
  },
  components: {
    Latex
  }
}
</script>

<style scoped>

</style>
