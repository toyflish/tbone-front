<template>
  <ShowNodeDefault :node="node" />
</template>

<script>
  import NodeService from '../services/NodeService'
  import ShowNodeDefault from './ShowNodeDefault'

  export default {
    name: 'node',
    props: ['slug'],
    data: function () {
      return {
        node: {}
      }
    },
    methods: {
      fetchNode: function (slug) {
        let thisVue = this
        let n = new NodeService()
        n.fetchBySlug(slug).then(function (node) {
          thisVue.node = node
          thisVue.$store.commit('setActiveNode', node)
        })
      }
    },
    mounted: function () {
      // this.$store.commit('setActiveNode', {empty: 'node'})
      console.log(`mounted call this.fetchNode(${this.$route.params.slug})`)
      if (this.props !== undefined && this.props.node !== undefined) {
        console.log('PropsNode')
      } else {
        console.log('ParamsNode')
        this.fetchNode(this.$route.params.slug)
      }
    },
    components: {
      ShowNodeDefault
    }
  }
</script>
