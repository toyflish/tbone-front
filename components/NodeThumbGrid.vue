<template>
  <div class="flex flex-wrap children-grid">
    <div
      v-for="node in nodes"
      :key="node.id"
      class="w-1/3 relative overflow-hidden children-grid__item"
    >
      <img
        v-if="node.preview_url"
        :src="node.preview_url"
        :alt="node.alt"
        :data-slug="node.slug"
        class="object-cover object-center absolute top-0 left-0 w-full h-full"
        @click="$emit('click', node)"
      />
      <span v-else class="primer">{{ node.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NodeThumbGrid',
  props: {
    nodes: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style></style>
