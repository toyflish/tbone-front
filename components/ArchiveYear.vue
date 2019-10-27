<template>
  <div class="container archive-year">
    <div class="px-4 container-text">
      <h1>{{ node.name }}</h1>
      <img v-if="node.attachment_url" :src="node.attachment_url" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="node.content"></div>
    </div>
    <ChildList :children="childrenReverse()" />
  </div>
</template>

<script>
import ChildList from './ChildList'
export default {
  name: 'ArchiveYear',
  components: {
    ChildList
  },
  props: { node: { type: Object, default: null } },
  methods: {
    // child nodes in reverse order without mutation outside Vuex
    childrenReverse() {
      const arr = []
      if (this.node.children !== undefined) {
        this.node.children.forEach((child) => arr.unshift(child))
      }
      return arr
    }
  }
}
</script>

<style lang="scss"></style>
