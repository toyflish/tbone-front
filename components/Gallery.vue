<template>
  <div class="gallery">
    <div class="container">
      <h1>{{ node.name }}</h1>
      <img :src="node.attachment_url" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="container-text px-4" v-html="node.content"></div>
      <ThumbGrid v-if="validateAllHavePreviewUrl(node.children)" :nodes="node.children" @click="swiperShow" />
      <div v-else class="children">
        <div class="list">
          <div v-for="item in node.children" :key="item.id" class="node">
            <nuxt-link :to="{ path: item.href }" style="display: block">
              <img v-if="item.attachment_url" :src="item.attachment_url" :alt="item.name" />
              <span v-else class="primer">{{ item.name }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container-text px-4">
      <!-- <VueDisqus shortname="toyflish" :identifier="String(node.id)" :url="`https://toyflish.com${node.href}`"></VueDisqus> -->
    </div>
    <SwiperSlide v-if="swiperOverlayOpen" :nodes="node.children" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import { scrollWindowTo } from '../utils/doScrolling'
// import VueDisqus from 'vue-disqus/VueDisqus.vue'
import ThumbGrid from './ThumbGrid'
import SwiperSlide from './SwiperSlide'

const sanitizedHash = (hash) => hash.replace('#', '')

export default {
  name: 'Gallery',
  components: {
    // VueDisqus
    ThumbGrid,
    SwiperSlide,
  },
  props: { node: { type: Object, default: null } },

  computed: {
    ...mapState('nav', { navState: (state) => state.state }),
    ...mapGetters('nav', ['swiperOverlayOpen']),
    routeHash() {
      return this !== undefined ? this.$route.hash.replace('#', '') : undefined
    },
  },
  watch: {
    routeHash(newValue, oldValue) {
      if (newValue === '' && oldValue !== '') {
        // history-back from open swiper to gallery view
        this.swiperClose()
      } else if (newValue !== '' && oldValue === '') {
        // history back from gallery view to open swiper
        this.swiperOpen()
      }
    },
    navState(_, oldValue) {
      if (oldValue === 'swiperOverlayOpen') {
        const hash = sanitizedHash(this.$route.hash)
        // on History-back hash is not present
        if (hash !== '') {
          this.$router.push(this.$route.path)
          const scrollToElement = document.querySelector(`[data-slug="${hash}"]`)
          this.$nextTick(() => {
            scrollWindowTo(scrollToElement, 500)
          })
        }
      }
    },
  },
  mounted() {
    const hash = sanitizedHash(this.$route.hash)
    if (hash !== '') {
      const node = this.node.children.find((n) => n.slug === hash)
      if (node) this.swiperShow(node, false)
    }
  },
  methods: {
    ...mapActions('nav', ['swiperOpen', 'swiperClose']),
    validateAllHavePreviewUrl(nodes) {
      if (Array.isArray(nodes)) {
        return (
          nodes.find(function (n) {
            return n.preview_url === undefined
          }) === undefined
        )
      } else {
        return undefined
      }
    },
    preloadImgSrc(url) {
      new Image().src = url
    },
    pushToNode(node) {
      this.$router.push({ path: this.node.href, hash: node.slug })
    },
    swiperShow(node, pushState = true) {
      if (pushState) {
        // set hash
        // eslint-disable-next-line camelcase
        const imgUrl = node?.attachment_url
        if (imgUrl) {
          this.preloadImgSrc(imgUrl)
          setTimeout(() => {
            this.pushToNode(node)
            this.swiperOpen()
          }, 200)
        } else {
          this.pushToNode(node)
          this.swiperOpen()
        }
      } else {
        this.swiperOpen()
      }
    },
  },
}
</script>

<style lang="scss"></style>
