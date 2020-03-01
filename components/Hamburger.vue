<template>
  <button
    :class="{ open: open }"
    @click="$emit('click')"
    class="hamburger-icon"
    role="menuitem"
    aria-label="toggle main menu"
  >
    <span :class="{ shadow }"></span>
    <span :class="{ shadow }"></span>
    <span :class="{ shadow }"></span>
  </button>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.hamburger-icon {
  position: relative;

  width: 45px;
  height: 45px;

  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;

  transform: scale(0.7);

  span {
    display: block;
    position: absolute;
    height: 6px;
    width: 100%;
    background: #fefefe;
    border-radius: 2px;
    opacity: 1;
    // flat when overlay open
    box-shadow: none;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2) {
      top: 15px;
    }

    &:nth-child(3) {
      top: 30px;
    }
  }

  span.shadow {
    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 10px;
  }

  &.open span {
    &:nth-child(1) {
      top: 18px;
      transform: rotate(135deg);
    }

    &:nth-child(2) {
      top: 18px;
      transform: rotate(-135deg);
    }

    &:nth-child(3) {
      top: 18px;
      transform: rotate(135deg);
      box-shadow: none;
    }
  }
}
</style>
