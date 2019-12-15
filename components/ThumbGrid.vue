<template>
  <div class="flex flex-wrap thumb-grid">
    <div
      v-for="node in nodes"
      :key="node.id"
      @click="$emit('click', node)"
      class="w-1/3 relative thumb-grid__item"
    >
      <VImg
        v-if="node.preview_url"
        :src="node.preview_url"
        :alt="node.alt"
        :data-slug="node.slug"
        :classes="{
          root: 'overflow-hidden relative full-w bg-orange-200 wrapper',
          img: 'object-cover object-center w-full'
        }"
      />
      <span v-else class="primer">{{ node.name }}</span>
    </div>
  </div>
</template>

<script>
import { VImg } from 'vuetensils'

export default {
  name: 'ThumbGrid',
  components: {
    VImg
  },
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
  margin-left: -$grid-margin;
  cursor: pointer;
  &__item {
    padding: 0 0 $grid-margin $grid-margin;
    &:before {
      content: '';
      float: left;
      padding-top: 100%;
    }
    .wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        height: 100%;
        transition: transform 0.2s ease-in-out;
        &:hover {
          transform: scale(1.03);
        }
      }
    }
  }
}
</style>
