<template>
  <div class="grid grid-cols-3 gap-0.5">
    <div
      v-for="node in nodes"
      :key="node.id"
      @click="$emit('click', node)"
      class="pt-square relative overflow-hidden cursor-pointer"
    >
      <VImg
        v-if="node.preview_url"
        :src="node.preview_url"
        :alt="node.alt"
        :data-slug="node.slug"
        :classes="{
          root:
            'transform duration-300 hover:scale-105 overflow-hidden absolute force-absolute inset-0  bg-orange-200',
          img: 'object-cover absolute inset-0 w-full h-full'
        }"
      />
      <span v-else class="primer">{{ node.name }}</span>
    </div>
  </div>
</template>

<script>
import VImg from '@/components/VImg'

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
.force-absolute {
  position: absolute !important;
}
.pt-square {
  padding-top: 100%;
}

$grid-margin: 2px;

.thumb-grid__item {
  cursor: pointer;
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
</style>
