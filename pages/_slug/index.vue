<template>
  <div class="pb-20">
    <NavBar class="z-10" />

    <div v-if="showLogo" class="container my-4">
      <Avatar
        :src="root.attachment_url"
        :alt="root.name"
        class="w-16 h-16 mx-auto mb-8"
      />
    </div>

    <!-- eslint-disable vue/require-component-is -->
    <component
      :is="requestNodeView"
      :key="node.current.slug"
      :node="node.current"
    />
    <!-- eslint-enable vue/require-component-is -->
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import NavBar from '@/components/NavBar'
import Avatar from '@/components/Avatar'

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
  /* eslint-disable */
  components: {
    Avatar,
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
  /* eslint-enable */
  props: { slug: { type: String, default: '' } },
  head() {
    return {
      title: this.node.current.title,
      meta: [
        {
          // hid: this.$store.state.requestNode.meta_description,
          name: 'description',
          content: this.node.current.meta_description || ''
        }
      ]
    }
  },
  computed: {
    ...mapState({
      node: (state) => state.node
    }),
    ...mapGetters('node', ['root']),
    requestNodeView() {
      const view = this.node.current.view
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
      return this.node.current.id !== undefined && this.node.current.id !== 1
    }
  },
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('node/fetchCurrent', {
        slug: params.slug || '',
        thumb_crop: '300x',
        full_crop: '600x'
      }),
      store.dispatch('fetchMenu')
    ]).catch((e) => {
      if (e.isAxiosError) {
        error({ statusCode: e.response.status, message: e.response.statusText })
      } else {
        // custom error
        error({ statusCode: e.statusCode, message: e.message })
      }
      return false
    })
  }
}
</script>

<style></style>
