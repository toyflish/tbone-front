<template>
  <form>
    <h3>Edit Node</h3>
    <div class="form-group">
      <label>Name:</label>
      <input type="text" v-model="node.name" class="form-control" @change="updateNode">
    </div>
    <div class="form-group" v-bind:class="{'has-danger': errors.slug !== undefined}">
      <label>Slug:</label>
      <input type="text" v-model="node.slug" class="form-control" @change="updateNode">
      <div class="form-control-feedback">{{errors.slug}}</div>
    </div>
  </form>
</template>

<script>
  import NodeService from '../services/NodeService'

  export default {
    name: 'NodesEdit',
    props: ['id'],

    data: function () {
      return {
        node: {
          id: null,
          name: '',
          slug: ''
        },
        errors: {
        }
      }
    },
    methods: {
      updateNode (e) {
        console.log('update node')
        let ns = new NodeService()
        ns.update(this.node)
          .then(() => { this.errors = {}; console.log('update node success!') })
          .catch((error) => { this.errors = error.response.data.errors; console.log('error-data', error.response.data.errors) })
      },
      loadNode () {
        console.log('NodesEdit#loadNode ()')
        console.log('NodesEdit#loadNode ()', this)
        let ns = new NodeService()
        if (this.$props.id) {
          console.log('NodesEdit#loadNode()fetch by props')
          ns.fetch(this.$props.id).then((node) => { console.log('set this node', this.node, 'to', node); this.node = node })
        } else {
          console.log('NodesEdit#loadNode() new node')
          this.data.node = ns.new()
        }
      }
    },
    watch: {
      id: function () {
        console.log('watch(id)')
        this.loadNode()
      }
    },
    created () {
    },
    mounted () {
      console.log('this mounted')
      this.loadNode()
    },
    fetch () {
    }
  }
</script>
