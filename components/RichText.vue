<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-bind="$attrs" v-html="highlighedContent" />
</template>

<script>
import 'highlight.js/styles/monokai-sublime.css'
// import javascript from 'highlight.js/lib/languages/javascript.js'
const hljs = () => import('highlight.js/lib/core')
const javascript = () => import('highlight.js/lib/languages/javascript')
const css = () => import('highlight.js/lib/languages/css')

export default {
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      highlighedContent: 'highlighting ..',
    }
  },
  mounted() {
    this.highlight()
  },
  methods: {
    async highlight() {
      const h = await hljs()
      const jsLang = await javascript().then((mod) => mod.default)
      const cssLang = await css().then((mod) => mod.default)
      await h.registerLanguage('javascript', jsLang)
      await h.registerLanguage('css', cssLang)
      this.highlighedContent = this.$props.content
      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach((block) => {
          h.highlightBlock(block)
        })
      })
    },
  },
}
</script>
