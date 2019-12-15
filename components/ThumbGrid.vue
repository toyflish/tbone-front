<template>
  <div class="flex flex-wrap thumb-grid">
    <div
      v-for="(node, i) in nodes"
      :key="node.id"
      :class="{ 'bg-orange-200': i % 2 }"
      class="w-1/3 relative overflow-hidden thumb-grid__item"
    >
      <img
        v-if="node.preview_url"
        :src="node.preview_url"
        :alt="node.alt"
        :data-slug="node.slug"
        @click="$emit('click', node)"
        class="object-cover object-center absolute top-0 left-0 w-full h-full"
      />
      <span v-else class="primer">{{ node.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThumbGrid',
  props: {
    nodes: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
$grid-margin: 2px;
.thumb-grid {
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
</style>
