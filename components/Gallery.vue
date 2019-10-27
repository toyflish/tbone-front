<template>
  <div class="gallery">
    <div class="container">
      <h1>{{ node.name }}</h1>
      <img :src="node.attachment_url" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="px-4 container-text" v-html="node.content"></div>
      <div v-if="validateAllHavePreviewUrl(node.children)" class="children">
        <div
          v-for="(batch, index) in childrenInBatches"
          :key="index"
          class="batch"
        >
          <div v-for="child in batch" :key="child.id" class="node">
            <a @click="swiperShow(child)">
              <img
                v-if="child.preview_url"
                :src="child.preview_url"
                :alt="child.alt"
              />
              <span v-else class="primer">{{ child.name }}</span>
            </a>
          </div>
        </div>
      </div>
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
      <div class="px-4 container-text">
        <!-- <VueDisqus shortname="toyflish" :identifier="String(node.id)" :url="`https://toyflish.com${node.href}`"></VueDisqus> -->
      </div>
    </div>
    <div v-if="swiperVisible" id="swiper-container">
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
import { doScrolling } from '../utils/doScrolling'
// import VueDisqus from 'vue-disqus/VueDisqus.vue'

export default {
  name: 'Gallery',
  components: {
    // VueDisqus
  },
  props: { node: { type: Object, default: null } },

  data() {
    return {
      batches: [1, 2, 3],
      pageYOffset: 0
    }
  },
  computed: {
    childrenInBatches() {
      return this.inBatches(this.node.children, 3)
    },
    swiperVisible() {
      return this.$store.state.hamburgerClickEvent === 'closeSwiper'
    }
  },
  mounted() {
    const hash = window.location.hash.substr(1)
    if (hash !== '') {
      const node = this.node.children.find((n) => n.slug === hash)
      this.swiperShow(node)
    }
  },
  methods: {
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
      const pageYOffset = window.pageYOffset
      // preloade image - trigger first call to selected image
      const img = new Image()
      img.src = node.attachment_url
      this.$store.commit('setHamburgerClickEvent', 'closeSwiper')
      // prepare the closing icon
      this.$root.$on('closeSwiper', function() {
        // restore position in gridview
        window.scrollTo(0, pageYOffset)
        this.$store.commit('setHamburgerClickEvent', 'openMainMenu')
      })
      this.$nextTick(() =>
        doScrolling(`#swiper-container [data-slug="${node.slug}"]`, 500, 50)
      )

      // set hash
      window.history.pushState({}, null, `${this.node.href}#${node.slug}`)
    }
  }
}
</script>

<style lang="scss">
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
