<template>
  <div>
    <NodeDispatcher />
  </div>
</template>

<script>
  import NodeService from '../services/NodeService'
  import NodeDispatcher from './_slug/index'

  export default {
    name: 'documentRoot',
    components: {
      NodeDispatcher
    },
    fetch: function ({ store, params }) {
      let ns = new NodeService()
      return Promise.all([ns.fetchBySlug({slug: ''}).then(function (node) {
        store.commit('setRequestNode', node)
      }),
        ns.fetchMenu().then(function (items) {
          store.commit('setMenuItems', items)
        })
      ])
    }
  }
</script>
