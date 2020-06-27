<template>
  <div class="flex justify-center">
    <div class="text-white  shadow-lg highlight">
      <span>
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.highlight {
  position: relative;
  transform: skew(-7deg) rotate(-1deg);
  font-weight: bold;
}
.highlight > span {
  position: relative;
  display: block;
  float: left;
  clear: left;
  padding: 0.3em;
  background-color: #ff5964;
  text-shadow: rgba(0, 0, 0, 0.1) 2px 2px 0px;
}
</style>
