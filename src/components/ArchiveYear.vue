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
      // child nodes in reverse order without mutation outside Vuex
      childrenReverse: function () {
        let arr = []
        if (this.node.children !== undefined) {
          this.node.children.forEach((child) => arr.unshift(child))
        }
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