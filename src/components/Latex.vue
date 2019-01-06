<template>
  <div>
    <div v-html="preview"></div>
    <ol class="text-danger">
      <li v-for="error in previewErrors" :key="error" v-text="error"></li>
    </ol>
  </div>
</template>

<script>
import katex from 'katex/dist/katex.mjs'
import showdown from 'showdown'

const converter = new showdown.Converter()

/**
 * Render content into latex
 * @param content the content to be converted
 * @param mode 0 - inline, 1 - inline block, 2 - block
 * @param errors
 */
function renderLatex (content, mode, errors) {
  try {
    let renderedContent = katex.renderToString(content, {
      throwOnError: true,
      displayMode: mode !== 0
    })
    if (mode === 1) {
      renderedContent = renderedContent.replace(
        /<span class="katex-display">(.*)<\/span>/gs,
        '<span class="katex-display inline-block">$1</span>')
    }
    return renderedContent
  } catch (e) {
    if (!(e instanceof katex.ParseError)) {
      throw e
    }
    errors.push(e)

    let errorMessage = `<span class="badge badge-danger">Error ${errors.length}</span>`
    if (mode === 2) {
      errorMessage = `<div class="text-center my-2">${errorMessage}</div>`
    }
    return errorMessage
  }
}

export default {
  name: 'latex',
  props: {
    value: String,
    inline: Boolean,
  },
  data: () => ({
    preview: '',
    previewErrors: [],
  }),
  mounted () {
    this.render()
  },
  methods: {
    render () {
      let previewErrors = []
      this.preview = this.value
        .replace( // inline block mode
          /\${3}([^$]+)\${3}/g,
          (match, content) => renderLatex(content, this.inline ? 0 : 2, previewErrors)
        )
        .replace(
          /\${2}([^$]+)\${2}/g,
          (match, content) => renderLatex(content, this.inline ? 0 : 1, previewErrors))
        .replace(
          /\$([^$]+)\$/g,
          (match, content) => renderLatex(content, 0, previewErrors)
        )
      this.preview = converter.makeHtml(this.preview)
      this.previewErrors = previewErrors
        .map(error => error.message.replace('KaTeX parse error: ', ''))
    }
  },
  watch: {
    value () {
      this.render()
    }
  }
}
</script>

<style src="katex/dist/katex.css"></style>

<style>
.katex-display.inline-block {
  display: inline-block;
}
</style>
