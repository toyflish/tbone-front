<template>
  <div class="timeline">
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div v-html="node.content"></div>

    <ChildList :children="node.linked_nodes" />
  </div>
</template>

<script>
  import ChildList from './ChildList'
  export default {
    name: 'Timeline',
    props: ['node'],
    components: {
      ChildList
    }
  }
</script>


<style lang="scss">
.timeline {
}
</style>
