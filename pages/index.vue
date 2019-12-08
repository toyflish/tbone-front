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
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('node/fetchCurrent', { slug: '' }),
      store.dispatch('fetchMenu')
    ])
  }
}
</script>
