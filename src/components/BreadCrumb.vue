<template>
  <div class="bread-crumb">
    <div class="node" v-for="breadCrumbNode in nodes()">
      <span v-if="breadCrumbNode.id == node.id">{{breadCrumbNode.name}}</span>
      <router-link v-else :to="{ path: breadCrumbNode.slug }">{{breadCrumbNode.name}}</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bread-crumb',
    props: {
      node: {
        type: Object
      }
    },
    methods: {
      nodes: function () {
        let path = []

        let runUp = function (node) {
          if (node.parent !== undefined) {
            runUp(node.parent)
          }
          path.push(node)
          return path
        }
        return runUp(this.node)
      }
    }
  }
</script>