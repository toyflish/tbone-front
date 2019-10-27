<template>
  <div
    class="rounded-full flex items-center justify-center overflow-hidden avatar"
  >
    <img class="object-cover" :src="src" />
  </div>
</template>
<script>
export default {
  props: { src: { type: String, default: null } }
}
</script>
<style lang="scss">
.avatar {
  box-shadow: 0 0 0 3px #fff, 0 0 0 4px #999, 0 2px 5px 4px rgba(0, 0, 0, 0.2);
  img {
    max-height: 100%;
    width: auto;
  }
}
</style>
