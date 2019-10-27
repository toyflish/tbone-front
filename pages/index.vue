<template>
  <div>
    <NodeDispatcher />
  </div>
</template>

<script>
import NodeDispatcher from './_slug/index'

export default {
  name: 'DocumentRoot',
  components: {
    NodeDispatcher
  },
  fetch: ({ store, params }) =>
    Promise.all([
      store.dispatch('fetchRequestNode', { slug: '' }),
      store.dispatch('fetchMenu')
    ])
}
</script>
