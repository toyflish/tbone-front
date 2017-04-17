<template>
  <div class="more-btn">
    <a v-on:click.stop="$emit('hit')">{{label}}</a>
  </div>
</template>

<script>
  export default {
    name: 'MoreButton',
    props: {
      label: {
        type: String,
        default: 'More'
      }
    }
  }
</script>

<style lang="scss">
  $more-btn-color: #222;
  $more-btn-color-hover: pink;

  .more-btn {
    width:120px;
    height: 120px;
    display: table;
    margin: 60px auto 0;
    position: relative;
    position:relative;
    a {
      color: $more-btn-color;
      display: table-cell;
      font-size: 12px;
      padding: 0 9px;
      position: relative;
      text-align: center;
      vertical-align: middle;

      font-weight: 600;
      text-transform: uppercase;

      &:hover {
        color: $more-btn-color-hover;
      }
    }
    &:before {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border-color: $more-btn-color;
      border-style: solid;
      border-width: 2px;
      box-sizing: border-box;
      content: '';
      left: 0;
      position: absolute;
      top: 0;
    }
    &:hover:before {
      border-color: $more-btn-color-hover;
    }
  }
</style>
