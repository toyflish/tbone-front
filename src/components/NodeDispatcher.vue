<template>
  <div class="dispatcher">
    <div class="logo-wrapper" v-if="showLogo">
      <Logo />
    </div>
    <div v-if="loading" class="loading">
      loading ...
    </div>
    <div v-if="error" class="loading">
      Loading error : {{errorMsg}}
    </div>
    <component :node="node" v-bind:is="activeNodeView"/>
  </div>
</template>

<script>
  import Logo from './Logo'

  import Home from './Home'
  import DefaultNode from './DefaultNode'
  import Gallery from './Gallery'
  import GalleryListing from './GalleryListing'
  import ArchiveYear from './ArchiveYear'
  import Archive from './Archive'
  import Timeline from './Timeline'
  import Gems from './Gems'

  export default {
    components: {
      Logo,
      Home,
      DefaultNode,
      Gallery,
      GalleryListing,
      ArchiveYear,
      Archive,
      Timeline,
      Gems
    },
    name: 'nodeDispatcher',
    props: ['slug'],
    data: function () {
      return {
        loading: true,
        error: false,
        errorMsg: '',
        node: {}
      }
    },
    methods: {
      fetchNode: function (slug) {
        console.log('NodeDispatcher::fetchNode')
        let thisVue = this
        this.$store.state.nodeService.fetchBySlug(slug).then(function (node) {
          thisVue.node = node
          thisVue.loading = false
          thisVue.$store.commit('setActiveNode', node)
        }).catch(function (error) {
          thisVue.loading = false
          thisVue.error = true
          thisVue.errorMsg = error.message
        })
      },
      componentsRegistered: function () {
        return Object.keys(this.$options.components)
      }
    },
    computed: {
      activeNodeView: function () {
        let view = this.$store.state.activeNode.view
        if (view === undefined || !this.componentsRegistered().includes(view)) {
          console.log(`NodeDispatcher: view(${view}) not registred, fall back to DefaultNode`)
          return 'DefaultNode'
        } else {
          return view
        }
      },
      showLogo: function () {
        return this.$store.state.activeNode.id !== undefined && this.$store.state.activeNode.id !== 1
      }
    },
    mounted: function () {
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

<style>

</style>