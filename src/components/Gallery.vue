<template>
  <div class="gallery">
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div class="container-text" v-html="node.content"></div>
    <div v-if="validateAllHavePreviewUrl(node.children)" class="children">
      <div class="batch" v-for="batch in childrenInBatches">
        <div class="node" v-for="node in batch">
          <router-link :to="{ path: node.slug }" style="display:block">
            <img v-if="node.preview_url" v-bind:src="node.preview_url" v-bind:alt="node.name"/>
            <span v-else class="primer">{{node.name}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="children">
      <div class="list">
        <div class="node" v-for="node in node.children">
          <router-link :to="{ path: node.slug }" style="display:block">
            <img v-if="node.attachment_url" v-bind:src="node.attachment_url" v-bind:alt="node.name"/>
            <span v-else class="primer">{{node.name}}</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="child in node.children">
          <img v-if="child.attachment_url" v-bind:src="child.attachment_url" v-bind:alt="child.name"/>
        </div>
      </div>
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'

  export default {
    name: 'gallery',
    props: ['node'],
    mounted: function () {
      let swiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        autoHeight: true
      })
      swiper
    },
    data: function () {
      return {
        batches: [1, 2, 3]
      }
    },
    computed: {
      childrenInBatches: function () {
        return this.inBatches(this.node.children, 3)
      }
    },
    methods: {
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

  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>