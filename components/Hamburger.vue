<template>
  <div class="hamburger-icon" :class="{ open: open }" @click="hamburgerClick">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  computed: {
    open() {
      switch (this.$store.state.hamburgerClickEvent) {
        case 'openMainMenu':
          return false
        case 'closeMainMenu':
          return true
        case 'closeSwiper':
          return true
        default:
          return false
      }
    }
  },
  methods: {
    hamburgerClick() {
      this.$root.$emit(this.$store.state.hamburgerClickEvent)
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
    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 10px;
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

  &.open span {
    // flat when overlay open
    box-shadow: none;

    &:nth-child(1) {
      top: 18px;
      transform: rotate(135deg);
    }

    &:nth-child(2) {
      opacity: 0;
      left: -60px;
    }

    &:nth-child(3) {
      top: 18px;
      transform: rotate(-135deg);
    }
  }
}
</style>
