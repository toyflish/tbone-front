<template>
  <div class="show-default-node">
    <h1>{{ node.name }}</h1>
    <img :src="node.attachment_url" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="node.content"></div>
    <div v-if="validateAllHavePreviewUrl(node.children)" class="children">
      <div v-for="(batch, index) in childrenInBatches" :key="index" class="batch">
        <div v-for="item in batch" :key="item.id" class="node">
          <nuxt-link :to="{ path: item.href }" style="display: block">
            <img v-if="item.preview_url" :src="item.preview_url" :alt="item.name" />
            <span v-else class="primer">{{ item.name }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
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
</template>

<script>
export default {
  name: 'ShowDefaultNode',
  props: { node: { type: Object, default: null } },
  data() {
    return {
      batches: [1, 2, 3],
    }
  },
  computed: {
    childrenInBatches() {
      return this.inBatches(this.node.children, 3)
    },
  },
  methods: {
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
    inBatches(nodes, size) {
      const batches = []
      if (Array.isArray(nodes)) {
        for (let i = 0; i < nodes.length; i += size) {
          batches.push(nodes.slice(i, size + i))
        }
      }
      return batches
    },
  },
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
}
</style>
