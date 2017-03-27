<template>
  <div class="hamburger-wrapper">
    <div v-on:click="hamburgerClick" class="hamburger-icon" v-bind:class="{ open: open }">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  computed: {
    open: function () {
      switch (this.$store.state.hamburgerClickEvent) {
        case 'openMainMenu':
          return false
        case 'closeMainMenu':
          return true
        default:
          return false
      }
    }
  },
  methods: {
    hamburgerClick: function () {
      console.log('emiting: ', this.$store.state.hamburgerClickEvent)
      this.$root.$emit(this.$store.state.hamburgerClickEvent)
    }
  }
}
</script>