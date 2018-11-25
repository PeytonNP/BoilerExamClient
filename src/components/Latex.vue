<template>
  <div v-if="previewError">
    <p v-html="preview" />
    <p v-text="previewError" class="text-danger"/>
  </div>
  <div v-else v-html="preview" />
</template>

<script>
import katex from 'katex/dist/katex.mjs'

const newLineRegex = new RegExp('\n', 'g')

export default {
  name: 'latex',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    preview: '',
    previewError: null,
  }),
  watch: {
    value () {
      try {
        this.preview = katex.renderToString(this.value, {
          throwOnError: true,
          displayMode: true, // false - inline, true - display mode
        })
        this.previewError = null
      } catch (e) {
        if (e instanceof katex.ParseError) {
          this.preview = this.value.replace(newLineRegex, '<br>')
          this.previewError = e.message.replace('KaTeX', 'LaTeX')
        } else {
          throw e
        }
      }
    }
  }
}
</script>

<style src="katex/dist/katex.css"></style>
