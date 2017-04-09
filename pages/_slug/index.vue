<template>
  <div class="container main">

    <NavBar/>

    <div class="logo-wrapper" v-if="showLogo">
      <Logo />
    </div>

    <div v-if="loading" class="loading">
      loading ...
    </div>

    <div v-if="error" class="loading">
      Loading error : {{errorMsg}}
    </div>

    <component :node="$store.state.requestNode" v-bind:is="requestNodeView"/>

  </div>
</template>

<script>
  import NodeService from '../../services/NodeService'
  import NavBar from '../../components/NavBar'
  import Logo from '../../components/Logo'

  import Home from '../../components/Home'
  import DefaultNode from '../../components/DefaultNode'
  import Gallery from '../../components/Gallery'
  import GalleryListing from '../../components/GalleryListing'
  import ArchiveYear from '../../components/ArchiveYear'
  import Archive from '../../components/Archive'
  import Timeline from '../../components/Timeline'
  import Gems from '../../components/Gems'

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
      Gems,
      NavBar
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
          thisVue.$store.commit('setRequestNode', node)
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
      requestNodeView: function () {
        let view = this.$store.state.requestNode.view
        if (view === undefined || !this.componentsRegistered().includes(view)) {
          console.log(`NodeDispatcher: view(${view}) not registred, fall back to DefaultNode`)
          return 'DefaultNode'
        } else {
          return view
        }
      },
      showLogo: function () {
        return this.$store.state.requestNode.id !== undefined && this.$store.state.requestNode.id !== 1
      }
    },
    mounted: function () {
      let slug = this.$route.params.slug

      // sanitize slug if document-root is called
      if (slug === undefined) {
        console.log('NodeDispatcher::mounted: slug undefinde maybee "/" !')
        slug = ''
      }
      // this.fetchNode(slug)
    },
    fetch: function ({ store, params }) {
      let ns = new NodeService()
      return Promise.all([ns.fetchBySlug(params.slug || '').then(function (node) {
        store.commit('setRequestNode', node)
      }),
        ns.fetchMenu().then(function (items) {
          store.commit('setMenuItems', items)
        })
      ])
    }
  }
</script>

<style>

</style>
