<template>
  <div class="gallery">
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div class="container-text" v-html="node.content"></div>
    <div v-if="validateAllHavePreviewUrl(node.children)" class="children">
      <div class="batch" v-for="batch in childrenInBatches">
        <div class="node" v-for="child in batch">
          <a v-on:click="swiperShow(child)">
            <img v-if="child.preview_url" v-bind:src="child.preview_url" v-bind:alt="child.alt"/>
            <span v-else class="primer">{{child.name}}</span>
          </a>
        </div>
      </div>
    </div>
    <div v-else class="children">
      <div class="list">
        <div class="node" v-for="node in node.children">
          <router-link :to="{ path: node.href }" style="display:block">
            <img v-if="node.attachment_url" v-bind:src="node.attachment_url" v-bind:alt="node.name" />
            <span v-else class="primer">{{node.name}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container-text">
      <VueDisqus shortname="toyflish" :identifier="String(node.id)" :url="`https://toyflish.com${node.href}`"></VueDisqus>
    </div>
    <div v-if="swiperVisible" id="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :id="child.slug" v-for="child in node.children" :data-slug="child.slug">
          <div class="img-wrapper"
            @click="swiperCloseAndRouteTo(child.href)"
            v-bind:style="{ width: `${swiperSlideWidth()}px`, height: `${swiperHeightFor(child.attachment_width, child.attachment_height)}px` }">
            <img v-if="child.attachment_url"
              v-bind:src="child.attachment_url"
              v-bind:alt="child.alt"
              v-bind:style="{ width: `${swiperSlideWidth()}px`, height: `${swiperHeightFor(child.attachment_width, child.attachment_height)}px` }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { doScrolling } from '../utils/doScrolling'
  import VueDisqus from 'vue-disqus/VueDisqus.vue'

  export default {
    name: 'gallery',
    props: ['node'],
    components: {
      VueDisqus
    },
    mounted: function () {
      console.log('Gallery mounted')
      let hash = window.location.hash.substr(1)
      if (hash !== '') {
        let node = this.node.children.find((n) => n.slug === hash)
        this.swiperShow(node)
      }
    },
    data: function () {
      return {
        batches: [1, 2, 3],
        pageYOffset: 0

      }
    },
    computed: {
      childrenInBatches: function () {
        return this.inBatches(this.node.children, 3)
      },
      swiperVisible: function () {
        return this.$store.state.hamburgerClickEvent === 'closeSwiper'
      }
    },
    methods: {
      inBatches: function (nodes, size) {
        let batches = []
        if (nodes instanceof (Array)) {
          for (let i = 0; i < nodes.length; i += size) {
            batches.push(nodes.slice(i, size + i))
          }
        }
        return batches
      },
      validateAllHavePreviewUrl: function (nodes) {
        if (nodes instanceof (Array)) {
          return nodes.find(function (n) {
            return n.preview_url === undefined
          }) === undefined
        } else {
          return undefined
        }
      },

      swiperSlideWidth: function () {
        return document.body.querySelector('.gallery').offsetWidth
      },
      swiperHeightFor: function (width, height) {
        return this.swiperSlideWidth() / (width / height)
      },
      swiperCloseAndRouteTo: function (href) {
        this.$root.$emit('closeSwiper')
        this.$router.push(href)
      },
      swiperShow: function (node) {
        // store actual position in gridview
        let pageYOffset = window.pageYOffset
        // trigger first call to selected image
        /* global Image */
        let img = new Image()
        img.src = node.attachment_url
        this.$store.commit('setHamburgerClickEvent', 'closeSwiper')
        // prepare the closing icon
        this.$root.$on('closeSwiper', function () {
          // restore position in gridview
          window.scrollTo(0, pageYOffset)
          this.$store.commit('setHamburgerClickEvent', 'openMainMenu')
        })
        this.$nextTick(() => doScrolling(`#swiper-container [data-slug="${node.slug}"]`, 500, 50))

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
      .node:nth-child(3n+1) {
        margin-right: 0.5%;
      }
      .node:nth-child(3n+3) {
        margin-left: 0.5%;
      }
    }
  }

  $backdrop: rgba(255,255,255, 1);
  #swiper-container {
    position: absolute;
    // position: fixed;
    top:0;
    // height: 100vh;
    // overflow-y: scroll;
    // bottom:0;
    // left:0;
    // right:0;
    width: 100%;
    height: 100%;
    background: $backdrop;
  }
  .swiper-slide {
    margin-top: 50px;
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