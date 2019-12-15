<template>
  <div class="gallery">
    <div class="container">
      <h1>{{ node.name }}</h1>
      <img :src="node.attachment_url" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="px-4 container-text" v-html="node.content"></div>
      <ThumbGrid
        v-if="validateAllHavePreviewUrl(node.children)"
        :nodes="node.children"
        @click="swiperShow"
      />
      <div v-else class="children">
        <div class="list">
          <div v-for="item in node.children" :key="item.id" class="node">
            <router-link :to="{ path: item.href }" style="display:block">
              <img
                v-if="item.attachment_url"
                :src="item.attachment_url"
                :alt="item.name"
              />
              <span v-else class="primer">{{ item.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="px-4 container-text">
      <!-- <VueDisqus shortname="toyflish" :identifier="String(node.id)" :url="`https://toyflish.com${node.href}`"></VueDisqus> -->
    </div>
    <SwiperSlide v-if="swiperOverlayOpen" :nodes="node.children" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import { doScrolling } from '../utils/doScrolling'
// import VueDisqus from 'vue-disqus/VueDisqus.vue'
import ThumbGrid from './ThumbGrid'
import SwiperSlide from './SwiperSlide'

export default {
  name: 'Gallery',
  components: {
    // VueDisqus
    ThumbGrid,
    SwiperSlide
  },
  props: { node: { type: Object, default: null } },

  data() {
    return {
      pageYOffset: 0,
      currentSlugInView: null
    }
  },
  computed: {
    ...mapState('nav', { navState: (state) => state.state }),
    ...mapGetters('nav', ['swiperOverlayOpen'])
  },
  watch: {
    navState(_, oldValue) {
      if (oldValue === 'swiperOverlayOpen') {
        this.$nextTick(
          () =>
            doScrolling(
              `.children [data-slug="${this.currentSlugInView}"]`,
              500,
              50
            ),
          100
        )
      }
    }
  },
  mounted() {
    const hash = window.location.hash.substr(1)
    if (hash !== '') {
      const node = this.node.children.find((n) => n.slug === hash)
      this.swiperShow(node, false)
    }
    // // fix history back from overlayGallery to normal gallery
    // // TODO unmuout event
    // window.onpopstate = (event) => {
    //   const hash = window.location.hash.substr(1)
    //   if (hash === '') {
    //     this.swiperClose()
    //   }
    // }
  },
  methods: {
    ...mapActions('nav', ['swiperOpen']),
    validateAllHavePreviewUrl(nodes) {
      if (Array.isArray(nodes)) {
        return (
          nodes.find(function(n) {
            return n.preview_url === undefined
          }) === undefined
        )
      } else {
        return undefined
      }
    },

    swiperShow(node, pushState = true) {
      // store actual position in gridview
      this.pageYOffset = window.pageYOffset

      if (pushState) {
        // set hash
        window.history.pushState({}, null, `${this.node.href}#${node.slug}`)
      }
      this.swiperOpen()
    }
  }
}
</script>

<style lang="scss"></style>
