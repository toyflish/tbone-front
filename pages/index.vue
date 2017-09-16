<template>
  <div>
    <NodeDispatcher />
  </div>
</template>

<script>
  import NodeDispatcher from './_slug/index'

  export default {
    name: 'documentRoot',
    components: {
      NodeDispatcher
    },
    fetch: function ({ store, params }) {
      return Promise.all([
        store.dispatch('fetchRequestNode', {slug: ''}),
        store.dispatch('fetchMenu')
      ])
    }
  }
</script>
