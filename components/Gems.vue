<template>
  <div class="gems">
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div class="container-text" v-html="node.content"></div>
    <ChildList :children="node.children" />
  </div>
</template>

<script>
  import ChildList from './ChildList'
  export default {
    name: 'Gems',
    props: ['node'],
    components: {
      ChildList
    }
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
