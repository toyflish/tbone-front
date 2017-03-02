<template>
  <div class="show-default-node">
    <breadCrumb v-bind:node="node" />
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div class="children">
      <div class="batch" v-for="batch in childrenInBatches">
        <div class="node" v-for="node in batch">
          <router-link :to="{ path: node.slug }" style="display:block">
            <img v-bind:src="node.preview_url" v-bind:alt="node.name"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from './BreadCrumb'

  export default {
    name: 'showDefaultNode',
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
      BreadCrumb
    }
  }
</script>


<style lang="scss">
.show-default-node {
  .children {
    .batch {
      margin-bottom: 3px;
      display: flex;
      flex-wrap: wrap;
      .node {
        width: 32%;
        * {
          display: block;
        }
      }
      .node:nth-child(3n+1) {
        margin-right: 3px;
      }
      .node:nth-child(3n+3) {
        margin-left: 3px;
      }
    }
  }
}
</style>