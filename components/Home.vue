<template>
  <div class="home">
    <div class="avatar" v-bind:style="{ backgroundImage: 'url(' + node.attachment_url + ')' }" >
    </div>
    <h1>{{node.name}}</h1>
    <div class="container-text" v-html="node.content"></div>
    <ChildList :children="node.linked_nodes" />
    <MoreBtn label="Show More" v-on:hit="loadMore" />
  </div>
</template>

<script>
  import MoreBtn from './MoreBtn'
  import ChildList from './ChildList'
  export default {
    name: 'home',
    props: ['node'],
    data: function () {
      return {
        linkedNodeOffest: 0,
        linkedNodeslimit: 10
      }
    },
    methods: {
      loadMore () {
        // this.linkedNodeOffest += 10
        this.linkedNodeslimit += 10

        this.$store.dispatch('fetchRequestNode', {slug: '', linked_nodes_level_down: 1, linked_nodes_limit: this.linkedNodeslimit})
      }
    },
    components: {
      ChildList,
      MoreBtn
    }
  }
</script>


<style lang="scss">
  .home {
    .content {
      padding: 15px;
    }
    padding-top: 100px;

    .avatar {
      position: relative;
      width:200px;
      height:200px;
      display: block;
      margin:auto;
      border-radius: 50%;
      box-shadow: 0 0 0 3px #fff, 0 0 0 4px #999, 0 2px 5px 4px rgba(0,0,0,.2);

      background-size: cover;
    }
  }
</style>
