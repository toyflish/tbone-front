<template>
  <div class="flex flex-wrap thumb-grid">
    <div
      v-for="node in nodes"
      :key="node.id"
      class="w-1/3 relative thumb-grid__item"
    >
      <div class="overflow-hidden relative full-w full-h bg-orange-200 wrapper">
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
  margin-left: -$grid-margin;
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
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
        &:hover {
          transform: scale(1.03);
        }
      }
    }
  }
}
</style>
