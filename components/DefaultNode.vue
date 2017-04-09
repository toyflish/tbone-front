<template>
  <div class="node-default">
    <div class="container-text">
      <h1>{{node.name}}</h1>
    </div>
    <img v-bind:src="node.attachment_url" />
    <div class="container-text content" v-html="node.content"></div>
    <div v-if="validateAllHavePreviewUrl(node.children)" class="children">
      <div class="batch" v-for="batch in childrenInBatches">
        <div class="node" v-for="node in batch">
          <router-link :to="{ path: node.href }" style="display:block">
            <img v-if="node.preview_url" v-bind:src="node.preview_url" v-bind:alt="node.name"/>
            <span v-else class="primer">{{node.name}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="children">
      <div class="list">
        <article class="node" v-for="node in node.children">
          <router-link v-if="node.attachment_url" :to="{ path: node.href }" style="display:block">
            <img  v-bind:src="node.attachment_url" v-bind:alt="node.name"/>
          </router-link>
          <div v-else class="container-text">
            <h2 ><router-link :to="{ path: node.href }">{{node.name}}</router-link></h2>
            <span class="subtitle">{{node.teaser}}</span>
          </div>
        </article>
      </div>
    </div>
    <div class="container-text">
      <VueDisqus shortname="toyflish" :identifier="String(node.id)" :url="`https://toyflish.com${node.href}`"></VueDisqus>
    </div>
  </div>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'

  export default {
    name: 'defaultNode',
    props: ['node'],
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
    },
    components: {
      VueDisqus
    }
  }
</script>


<style lang="scss">
.node-default {
  .container-text.content {
    margin-bottom: 30px;
    text-align: left;
  }
  .children {
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
    .article {
      margin: 15px auto;
    }
  }
}
</style>
