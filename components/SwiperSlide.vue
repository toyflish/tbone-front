<template>
  <div id="swiperSlide" ref="slider" class="backdrop fixed top-0 left-0 w-full h-full overflow-y-scroll">
    <div class="swiper-wrapper container">
      <div
        v-for="node in nodes"
        :ref="node.slug"
        :key="node.id"
        :data-slug="node.slug"
        :style="{
          'padding-top': ratioPercent(node.attachment_width, node.attachment_height),
        }"
        class="relative w-full my-4"
      >
        <div class="wrapper absolute top-0 left-0 w-full h-full bg-orange-200">
          <VImg
            v-if="node.attachment_url"
            :src="node.attachment_url"
            :alt="node.alt"
            :placeholder="node.preview_url"
            :transition-duration="1000"
            :classes="{
              root: '',
              placeholder: 'object-cover object-center w-full',
              img: 'object-cover object-center w-full',
            }"
          />
        </div>
        <!-- class="absolute top-0 left-0 object-cover object-center w-full h-full" -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VImg from '@/components/VImg'
import { scrollContainerTo } from '../utils/doScrolling'

export default {
  name: 'SwiperSlide',
  components: {
    VImg,
  },
  props: {
    nodes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentSlugInView: null,
      initialScrolling: false,
      initialScrollTarget: null,
    }
  },
  computed: {
    ...mapState('nav', { navState: (state) => state.state }),
    ...mapGetters('nav', ['swiperOverlayOpen']),
  },
  watch: {
    $route({ hash }, { hash: oldHash }) {
      /**
       * scroll to image refed by slug , only if we come gallery view with blank hash
       */
      if (oldHash === '' && hash !== '') {
        this.initialScrollTarget = hash.substr(1)
        this.scrollTo(hash.substr(1))
      }
    },
  },
  mounted() {
    if (this.$route.hash) this.scrollTo(this.$route.hash.substr(1))
    this.bodyScrolls(false)
    this.mountObserver()
  },
  beforeDestroy() {
    this.bodyScrolls(true)
  },
  methods: {
    ...mapActions('nav', ['swiperOpen', 'swiperClose']),
    scrollTo(scrollTargetRef) {
      this.initialScrolling = true
      const vm = this
      this.$nextTick(() => {
        scrollContainerTo(this.$refs.slider, this.$refs[scrollTargetRef][0], 500, 'center', () => {
          vm.initialScrolling = false
        })
      })
    },
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
              // if not current url
              if (slug !== this.$route.hash.substr(1) && !this.initialScrolling) {
                this.$router.replace({ path: this.$route.path, hash: slug })
              }
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
    },
  },
}
</script>

<style lang="scss">
$backdrop: rgba(255, 255, 255, 1);
.backdrop {
  background-color: $backdrop;
}
</style>
