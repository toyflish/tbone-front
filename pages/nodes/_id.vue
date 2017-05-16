<template>
  <div class="container main">
    <h1>edit Node</h1>
    <NodesTree />
    <NodesEdit v-bind:id="this.$store.state.requestNode.id" />
    <NavBar/>

  </div>
</template>

<script>
  import NavBar from '../../components/NavBar'
  import NodesTree from '../../components/NodesTree'
  import NodesEdit from '../../components/NodesEdit'

  import NodeService from '../../services/NodeService'

  export default {
    name: 'NodesId',
    components: {
      NavBar,
      NodesTree,
      NodesEdit
    },
    fetch: function ({ store, params }) {
      let ns = new NodeService()
      return ns.fetch(params.id).then(function (node) {
        store.commit('setRequestNode', node)
      })
    }
  }
</script>
