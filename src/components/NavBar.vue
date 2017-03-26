<template>
  <div class="nav">
    <div class="container">
      <div class="hamburger-wrapper">
        <div v-on:click="hamburgerClick" class="hamburger-icon" v-bind:class="{ open: menuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
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
              <router-link :to="{path: item.href}" v-on:click.native="$emit('closeMainMenu')">
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
import axios from 'axios'

// import NodeService from '../services/NodeService'
import BreadCrumbArrow from './BreadCrumbArrow'

export default {
  name: 'navBar',
  data () {
    return {
      menuOpen: false,
      items: []
    }
  },
  computed: {
    node: function () {
      return this.$store.state.activeNode
    },
    breadcrumb: function () {
      // let node = this.$store.state.activeNode
      return typeof this.node.breadcrumb === 'function' ? this.node.breadcrumb() : []
    }
  },
  methods: {
    hamburgerClick: function () {
      console.log('emiting: ', this.$store.state.hamburgerClickEvent)
      this.$emit(this.$store.state.hamburgerClickEvent)
    }
  },
  mounted: function () {
    this.$on('openMainMenu', function () {
      this.menuOpen = true
      this.$store.commit('setHamburgerClickEvent', 'closeMainMenu')
    })

    this.$on('closeMainMenu', function () {
      this.menuOpen = false
      this.$store.commit('setHamburgerClickEvent', 'openMainMenu')
    })

    let thisView = this
    axios.get(`${this.$store.state.apiUrl}/api/nodes/menu.json`)
    .then(function (response) {
      thisView.items = response.data
    })
  },
  components: {
    BreadCrumbArrow
  }
}
</script>

<style lang="scss">
</style>
