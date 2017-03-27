<template>
  <div class="nav">
    <div class="container">
      <Hamburger />
      <div class="breadcrumb">
        <div v-for="crumb in breadcrumb">
          <router-link :to="{path: crumb.href}">
            <BreadCrumbArrow />
          </router-link>
        </div>
      </div>
      <div class="overlay-menu" v-bind:class="{ open: menuOpen }">
        <nav>
          <ul>
            <li style="height: 20%" v-for="item in items">
              <router-link :to="{path: item.href}" v-on:click.native="$root.$emit('closeMainMenu')">
                {{item.link_name}}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Hamburger from './Hamburger'
import BreadCrumbArrow from './BreadCrumbArrow'

export default {
  name: 'navBar',
  data () {
    return {
      items: []
    }
  },
  computed: {
    node: function () {
      return this.$store.state.activeNode
    },
    breadcrumb: function () {
      return typeof this.node.breadcrumb === 'function' ? this.node.breadcrumb() : []
    },
    menuOpen: function () {
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

  mounted: function () {
    this.$root.$on('openMainMenu', function () {
      this.$store.commit('setHamburgerClickEvent', 'closeMainMenu')
    })

    this.$root.$on('closeMainMenu', function () {
      this.$store.commit('setHamburgerClickEvent', 'openMainMenu')
    })

    let thisView = this
    this.$store.state.nodeService.fetchMenu().then(function (menuData) {
      thisView.items = menuData
    })
  },
  components: {
    BreadCrumbArrow,
    Hamburger
  }
}
</script>

<style lang="scss">
</style>
