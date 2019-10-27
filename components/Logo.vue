<template>
  <router-link :to="{ path: '/' }">
    <div class="logo">
      <div class="label">t</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss">
.logo {
  margin: auto;
  position: relative;
  display: flex;
  align-content: center;
  width: 50px;
  height: 50px;
  margin: auto;
  border-radius: 50%;
  background-color: #000;

  .label {
    padding: 2px 0px 0px 0px;
    font-size: 26px;
    line-height: 14px;
    width: 30px;
    height: 22px;
    margin: auto;
    color: #fff;
    text-align: center;
  }
}
</style>
