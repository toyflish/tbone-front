<template>
  <div>
    <div class="parents">
      <h5>parents</h5>
      <div v-for="parent in breadcrumb">
        <router-link :to="{ name: 'nodes-id', params: {id: parent.id} }">{{parent.href}}</router-link>
        <router-link :to="{ path: parent.href}">[+]</router-link>
      </div>
    </div>
    <div class="node">{{node.name}} ({{node.href}})
      <router-link :to="{ path: node.href}">[+]</router-link>
    </div>
    <div class="children">
      <h5>children</h5>
      <div v-for="child in node.children">
        <router-link :to="{ name: 'nodes-id', params: {id: child.id} }">{{child.name}}</router-link>
        <router-link :to="{ path: child.href}">[+]</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import NodeService from '../services/NodeService'

  export default {
    name: 'NodesTree',
    computed: {
      node () {
        return this.$store.state.requestNode
      },
      breadcrumb: function () {
        let ns = new NodeService()
        return (ns.nodify(this.node)).breadcrumb()
      }
    }
  }
</script>
<style lang="scss">
  .parents {
    h5 {text-align:left}
    div {
      text-align:left;
    }
  }
  .node {
    background: #eee;
    margin: 10px;
    text-align:center;
  }
  .children {
    h5 {text-align:right}
    div {
      text-align:right;
    }
  }
</style>
