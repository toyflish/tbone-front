<template>
  <div class="gems">
    <h1>{{ node.name }}</h1>
    <img :src="node.attachment_url" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="px-4 container-text" v-html="node.content"></div>
    <ChildList :children="node.children" />
  </div>
</template>

<script>
import ChildList from './ChildList'
export default {
  name: 'Gems',
  components: {
    ChildList
  },
  props: { node: { type: Object, default: null } }
}
</script>

<style lang="scss">
.gems {
  .children {
    article {
      margin-top: 40px;
    }
  }
}
</style>
