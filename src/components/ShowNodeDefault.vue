<template>
  <div class="show-default-node">
    <breadCrumb v-bind:node="node" />
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div class="children">
      <div class="node" v-for="node in node.children">
        <router-link :to="{ path: node.slug }">
          <img v-bind:src="node.preview_url" v-bind:alt="node.name"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from './BreadCrumb'

  export default {
    name: 'showDefaultNode',
    props: ['node'],
    components: {
      BreadCrumb
    }
  }
</script>


<style>
.show-default-node .children {
  background: yellow;
}
.show-default-node {
  .children {
    background: red;
  }
}
</style>