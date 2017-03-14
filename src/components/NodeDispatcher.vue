<template>
  <div class="dispatcher">
    <div v-if="loading" class="loading">
      loading ...
    </div>
    <component :node="node" v-bind:is="activeNodeView"/>
  </div>
</template>

<script>
  import NodeService from '../services/NodeService'

  import Home from './Home'
  import DefaultNode from './DefaultNode'
  import Gallery from './Gallery'
  import GalleryListing from './GalleryListing'
  import ArchiveYear from './ArchiveYear'
  import Archive from './Archive'

  export default {
    components: {
      Home,
      DefaultNode,
      Gallery,
      GalleryListing,
      ArchiveYear,
      Archive
    },
    name: 'nodeDispatcher',
    props: ['slug'],
    data: function () {
      return {
        loading: true,
        node: {}
      }
    },
    methods: {
      fetchNode: function (slug) {
        console.log('NodeDispatcher::fetchNode slug:', slug)
        let thisVue = this
        let n = new NodeService()
        n.fetchBySlug(slug).then(function (node) {
          thisVue.node = node
          thisVue.loading = false
          console.log(thisVue.node.view)
          thisVue.$store.commit('setActiveNode', node)
        })
      }
    },
    computed: {
      activeNodeView: function () {
        let view = this.$store.state.activeNode.view
        if (view === undefined) {
          console.log('NodeDispatcher: view undefined, fall back to DefaultNode')
          return 'DefaultNode'
        } else {
          return view
        }
      }
    },
    mounted: function () {
      console.log(`NodeDispatcher::mounted.fetchNode(${this.$route.params.slug})`)
      let slug = this.$route.params.slug

      // sanitize slug if document-root is called
      if (slug === undefined) {
        console.log('NodeDispatcher::mounted: slug undefinde maybee "/" !')
        slug = ''
      }
      this.fetchNode(slug)
    }
  }
</script>
