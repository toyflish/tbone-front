<template>
  <div v-html="highlighedContent" v-bind="$attrs" />
</template>

<script>
import 'highlight.js/styles/monokai-sublime.css'
const hljs = () => require('highlight.js/lib/highlight.js')
const javascript = () => require('highlight.js/lib/languages/javascript.js')
const css = () => require('highlight.js/lib/languages/css')

export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      highlighedContent: 'highlighting ..'
    }
  },
  async mounted() {
    const h = await hljs()
    await h.registerLanguage('javascript', await javascript())
    await h.registerLanguage('css', await css())
    this.highlighedContent = this.$props.content
    this.$nextTick(() => {
      this.$el.querySelectorAll('pre code').forEach((block) => {
        h.highlightBlock(block)
      })
    })
  }
}
</script>
