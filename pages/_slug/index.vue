<template>
  <div class="container main">

    <NavBar/>

    <div class="logo-wrapper" v-if="showLogo">
      <Logo />
    </div>

    <component :node="$store.state.requestNode" v-bind:is="requestNodeView"/>

  </div>
</template>

<script>
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

  import nodeBySlug from '~/apollo/queries/nodeBySlug'

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
    head: function () {
      return {
        title: this.$store.state.requestNode.title,
        meta: [
          {
            // hid: this.$store.state.requestNode.meta_description,
            name: 'description',
            content: this.$store.state.requestNode.meta_description || ''
          }
        ]
      }
    },
    apollo: {
      node_by_slug: {
        prefetch: true,
        query: nodeBySlug
      }
    },
    methods: {
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
    fetch: function ({ store, params }) {
      return Promise.all([
        store.dispatch('fetchRequestNode', {slug: (params.slug || '')}),
        store.dispatch('fetchMenu')
      ])
    }
  }
</script>

<style>

</style>
