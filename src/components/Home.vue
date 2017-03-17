<template>
  <div class="home">
    <div class="avatar" v-bind:style="{ backgroundImage: 'url(' + node.attachment_url + ')' }" >
    </div>
    <h1>{{node.name}}</h1>
    <div class="content" v-html="node.content"></div>

  </div>
</template>

<script>
  export default {
    name: 'home',
    props: ['node']
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