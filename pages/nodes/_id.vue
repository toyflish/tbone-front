<template>
  <div class="container main">
    <h1>edit Node</h1>
    <NodesTree />
    <NavBar/>

  </div>
</template>

<script>
  import NavBar from '../../components/NavBar'
  import NodesTree from '../../components/NodesTree'

  import NodeService from '../../services/NodeService'

  export default {
    name: 'NodesEdit',
    components: {
      NavBar,
      NodesTree
    },
    fetch: function ({ store, params }) {
      let ns = new NodeService()
      return ns.fetch(params.id).then(function (node) {
        store.commit('setRequestNode', node)
      })
    }
  }
</script>
