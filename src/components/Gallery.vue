<template>
  <div class="gallery">
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div class="container-text" v-html="node.content"></div>
    <div v-if="validateAllHavePreviewUrl(node.children)" class="children">
      <div class="batch" v-for="batch in childrenInBatches">
        <div class="node" v-for="child in batch">
          <a v-on:click="showSwiper(child)">
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

    <div v-if="swiperVisible" id="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :id="child.slug" v-for="child in node.children" :data-slug="child.slug">
          <img v-if="child.attachment_url"
            v-bind:src="child.attachment_url"
            v-bind:alt="child.alt"
            v-bind:style="{ width: `${swiperSlideWidth()}px`, height: `${swiperHeightFor(child.attachment_width, child.attachment_height)}px` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { doScrolling } from '../utils/doScrolling'

  export default {
    name: 'gallery',
    props: ['node'],
    data: function () {
      return {
        batches: [1, 2, 3],
        swiper: {}
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
      swiperSlideWidth: function () {
        return document.body.querySelector('.gallery').offsetWidth
      },
      swiperHeightFor: function (width, height) {
        return this.swiperSlideWidth() / (width / height)
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
      inBatches: function (nodes, size) {
        let batches = []
        if (nodes instanceof (Array)) {
          for (let i = 0; i < nodes.length; i += size) {
            batches.push(nodes.slice(i, size + i))
          }
        }
        return batches
      },
      showSwiper: function (node) {
        console.log('Gallery::showSwiper', node)
        // set hash for swiper to show the image
        window.history.pushState({}, null, `${this.node.href}#${node.slug}`)
        this.$store.commit('setHamburgerClickEvent', 'closeSwiper')
        this.$nextTick(() => doScrolling(`#swiper-container [data-slug="${node.slug}"]`, 500, 50))

        this.$nextTick(() => this.initSwiper())
      },
      initSwiper: function () {
        console.log('Gallery::initSwiper')
        // prepare the closing icon
        this.$root.$on('closeSwiper', function () {
          this.$store.commit('setHamburgerClickEvent', 'openMainMenu')
        })
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

  $backdrop: rgba(255,255,255, 0.8);
  #swiper-container {
    position: absolute;
    // position: fixed;
    top:0;
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
  }

}
</style>