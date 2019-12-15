<template>
  <div
    id="swiperSlide"
    ref="slider"
    class="fixed top-0 left-0 w-full h-full overflow-y-scroll backdrop"
  >
    <div class="container swiper-wrapper">
      <div
        v-for="node in nodes"
        :id="node.slug"
        :ref="node.slug"
        :key="node.id"
        :data-slug="node.slug"
        :style="{
          'padding-top': ratioPercent(
            node.attachment_width,
            node.attachment_height
          )
        }"
        class="relative w-full my-4"
      >
        <div class="absolute top-0 left-0 w-full h-full bg-orange-200 wrapper">
          <VImg
            v-if="node.attachment_url"
            :src="node.attachment_url"
            :alt="node.alt"
            :placeholder="node.preview_url"
            :classes="{
              root: '',
              placeholder: 'object-cover object-center w-full',
              img: 'object-cover object-center w-full'
            }"
          />
        </div>
        <!-- class="object-cover object-center absolute top-0 left-0 w-full h-full" -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { VImg } from 'vuetensils'

import { scrollContainerTo } from '../utils/doScrolling'
export default {
  nSlide: 'SwiperSlide',
  components: {
    VImg
  },
  props: {
    nodes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentSlugInView: null
    }
  },
  computed: {
    ...mapState('nav', { navState: (state) => state.state }),
    ...mapGetters('nav', ['swiperOverlayOpen'])
  },
  mounted() {
    this.bodyScrolls(false)
    const hash = window.location.hash.substr(1)
    if (hash !== '') {
      this.$nextTick(() => {
        scrollContainerTo(this.$refs.slider, this.$refs[hash][0], 500)
        this.mountObserver()
      }, 100)
    }
  },
  beforeDestroy() {
    this.bodyScrolls(true)
  },
  methods: {
    ...mapActions('nav', ['swiperOpen', 'swiperClose']),
    bodyScrolls(on) {
      if (!on) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.overflow = 'auto'
      }
    },

    mountObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              const slug = entry.target.dataset.slug
              // this.currentSlugInView = slug
              this.$router.replace({ path: this.$route.path, hash: slug })
              // this.$emit('scrolledToSlug', slug)
            }
          })
        },
        { threshold: [0.8] }
      )

      const images = this.nodes.map((node) => this.$refs[node.slug][0])

      images.forEach((img) => {
        observer.observe(img)
      })
    },

    ratioPercent: (width, height) => {
      return `${(height / width) * 100}%`
    }
  }
}
</script>

<style lang="scss">
$backdrop: rgba(255, 255, 255, 1);
.backdrop {
  background-color: $backdrop;
}
</style>
