<template>
  <div class="archive">
    <h1>Archive</h1>
    <button v-on:click="fetchYears()">load</button>
    <div class="node" v-for="node in nodes">
      <div>{{node.name}}</div>
      <img v-bind:src="node.attachment_url" />
    </div>
  </div>
</template>

<script>
  import NodeService from '../services/NodeService'

  export default {
    name: 'archvie',
    data: function () {
      return {
        nodes: []
      }
    },
    methods: {
      fetchYears: function () {
        let thisVue = this
        let n = new NodeService()
        console.log('nodeservice', n.fetch(13938))
        n.fetch(13938).then(function (node) {
          thisVue.nodes = node.children.filter(node => node.visibility === 'visible').reverse()
        })
      }
    },
    mounted: function () {
      this.fetchYears()
    }
  }
</script>

<style scoped>
  .archive {
    width: 100%;
  }
</style>
