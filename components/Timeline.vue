<template>
  <div class="timeline">
    <h1>{{ node.name }}</h1>
    <img :src="node.attachment_url" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="node.content"></div>

    <ChildList :children="node.linked_nodes" />
  </div>
</template>

<script>
import ChildList from './ChildList'
export default {
  name: 'Timeline',
  components: {
    ChildList
  },
  props: { node: { type: Object, default: null } }
}
</script>

<style lang="scss"></style>
