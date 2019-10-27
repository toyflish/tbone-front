<template>
  <div>
    <NavBar />

    <div v-if="showLogo" class="mb-4">
      <Logo />
    </div>

    <component :is="requestNodeView" :node="$store.state.requestNode" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Logo from '@/components/Logo'

import Home from '@/components/Home'
import DefaultNode from '@/components/DefaultNode'
import Gallery from '@/components/Gallery'
import GalleryListing from '@/components/GalleryListing'
import ArchiveYear from '@/components/ArchiveYear'
import Archive from '@/components/Archive'
import Timeline from '@/components/Timeline'
import Gems from '@/components/Gems'

export default {
  name: 'NodeDispatcher',
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
  props: { slug: { type: String, default: '' } },
  head() {
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
  computed: {
    requestNodeView() {
      const view = this.$store.state.requestNode.view
      if (
        view === undefined ||
        !Object.keys(this.$options.components).includes(view)
      ) {
        return 'DefaultNode'
      } else {
        return view
      }
    },
    showLogo() {
      return (
        this.$store.state.requestNode.id !== undefined &&
        this.$store.state.requestNode.id !== 1
      )
    }
  },
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('fetchRequestNode', { slug: params.slug || '' }),
      store.dispatch('fetchMenu')
    ])
  }
}
</script>

<style></style>
