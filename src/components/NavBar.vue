<template>
  <div class="nav">
    <div class="container">
      <div class="hamburger-wrapper">
        <div v-on:click="toggleMenuState" class="hamburger-icon" v-bind:class="{ open: menuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="back-wrapper">
        <div v-on:click="historyBack" class="back-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="overlay-menu" v-bind:class="{ open: menuOpen }">
        <nav>
          <ul>
            <li style="height: 20%" v-for="item in items">
              <router-link :to="{path: sanitizeSlug(item.slug)}" v-on:click.native="toggleMenuState">{{item.link_name}}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'navBar',
  data () {
    return {
      menuOpen: false,
      items: []
    }
  },
  methods: {
    historyBack: function () {
      console.log('history back')
    },
    toggleMenuState: function () {
      this.menuOpen = !this.menuOpen
      console.log('toggleMenuState')
    },
    // sanitize root slug from "" to "/"
    sanitizeSlug: function (slug) {
      return slug === '' ? '/' : slug
    }
  },
  mounted: function () {
    let thisView = this
    axios.get(`http://toyflish.dev/api/nodes/menu.json`)
    .then(function (response) {
      thisView.items = response.data
    })
  }
}
</script>

<style lang="scss">
</style>
