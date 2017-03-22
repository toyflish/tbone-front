<template>
  <div class="archive-year">
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div v-html="node.content"></div>
    <ChildList :children="childrenReverse()" />
  </div>
</template>

<script>
  import ChildList from './ChildList'
  export default {
    name: 'archiveYear',
    props: ['node'],
    methods: {
      childrenReverse: function () {
        let arr = []
        this.node.children.forEach((child) => arr.unshift(child))
        return arr
      }
    },
    components: {
      ChildList
    }
  }
</script>


<style lang="scss">
.archive-year {
}
</style>