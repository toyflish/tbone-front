<template>
  <div class="gallery">
    <div class="container">
      <h1>{{ node.name }}</h1>
      <img :src="node.attachment_url" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="px-4 container-text" v-html="node.content"></div>
      <NodeThumbGrid
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
    <div v-if="swiperOverlayOpen" id="swiper-container">
      <div class="container swiper-wrapper">
        <div
          v-for="child in node.children"
          :id="child.slug"
          :key="child.id"
          class="swiper-slide"
          :data-slug="child.slug"
        >
          <div
            class="img-wrapper"
            :style="{
              width: `${swiperSlideWidth()}px`,
              height: `${swiperHeightFor(
                child.attachment_width,
                child.attachment_height
              )}px`
            }"
            @click="swiperCloseAndRouteTo(child.href)"
          >
            <img
              v-if="child.attachment_url"
              :src="child.attachment_url"
              :alt="child.alt"
              :style="{
                width: `${swiperSlideWidth()}px`,
                height: `${swiperHeightFor(
                  child.attachment_width,
                  child.attachment_height
                )}px`
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import { doScrolling } from '../utils/doScrolling'
// import VueDisqus from 'vue-disqus/VueDisqus.vue'
import NodeThumbGrid from './NodeThumbGrid'

export default {
  name: 'Gallery',
  components: {
    // VueDisqus
    NodeThumbGrid
  },
  props: { node: { type: Object, default: null } },

  data() {
    return {
      batches: [1, 2, 3],
      pageYOffset: 0,
      currentSlugInView: null
    }
  },
  computed: {
    ...mapState('nav', { navState: (state) => state.state }),
    ...mapGetters('nav', ['swiperOverlayOpen']),
    childrenInBatches() {
      return this.inBatches(this.node.children, 3)
    }
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
      this.swiperShow(node)
    }
    // fix history back from overlayGallery to normal gallery
    // TODO unmuout event
    window.onpopstate = (event) => {
      const hash = window.location.hash.substr(1)
      if (hash === '') {
        this.swiperClose()
      }
    }
  },
  methods: {
    ...mapActions('nav', ['swiperOpen', 'swiperClose']),
    inBatches(nodes, size) {
      const batches = []
      if (Array.isArray(nodes)) {
        for (let i = 0; i < nodes.length; i += size) {
          batches.push(nodes.slice(i, size + i))
        }
      }
      return batches
    },
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

    mountObserver() {
      const galleryNodes = document.querySelectorAll(
        '#swiper-container [data-slug]'
      )

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              const slug = entry.target.dataset.slug
              this.currentSlugInView = slug
            }
          })
        },
        { threshold: [0.8] }
      )

      galleryNodes.forEach((image) => {
        observer.observe(image)
      })
    },

    swiperSlideWidth() {
      return document.body.querySelector('.gallery .container').offsetWidth
    },
    swiperHeightFor(width, height) {
      return this.swiperSlideWidth() / (width / height)
    },
    swiperCloseAndRouteTo(href) {
      this.$root.$emit('closeSwiper')
      this.$router.push(href)
    },
    swiperShow(node) {
      // store actual position in gridview
      this.pageYOffset = window.pageYOffset
      // preloade image - trigger first call to selected image
      const img = new Image()
      img.src = node.attachment_url
      this.swiperOpen()
      this.$nextTick(() => {
        doScrolling(`#swiper-container [data-slug="${node.slug}"]`, 500, 50)
        this.mountObserver()
      }, 100)

      // set hash
      window.history.pushState({}, null, `${this.node.href}#${node.slug}`)
    }
  }
}
</script>

<style lang="scss">
$grid-margin: 2px;
.children-grid {
  &__item {
    &:before {
      content: '';
      float: left;
      padding-top: 100%;
    }
    img {
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
      &:hover {
        transform: scale(1.03);
      }
    }
  }
}
.gallery {
  .children {
    margin: 15px auto;
    .batch {
      margin-bottom: 3px;
      display: flex;
      flex-wrap: wrap;
      .node {
        cursor: pointer;
        // 3x33 => 99% + 2 x 3px (0.5%)
        width: 33%;
        * {
          display: block;
        }
      }
      .node:nth-child(3n + 1) {
        margin-right: 0.5%;
      }
      .node:nth-child(3n + 3) {
        margin-left: 0.5%;
      }
    }
  }

  $backdrop: rgba(255, 255, 255, 1);
  #swiper-container {
    position: absolute;
    top: 0;
    // overflow-y: scroll;
    // bottom:0;
    // left:0;
    right: 0;
    width: 100%;
    // height: 100%;
    background-color: $backdrop;
  }
  .swiper-slide {
    margin: 50px auto;
    text-align: center;
    font-size: 18px;
    background: $backdrop;
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;

    .img-wrapper {
      background-color: rgba(245, 245, 245, 1);
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
