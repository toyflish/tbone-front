<template>
  <div class="container fixed bottom-0 flex gradient px-4 py-4">
    <div class="w-12">
      <router-link
        v-if="breadcrumbVisible && upLink"
        :to="{ path: upLink.href }"
      >
        <BreadCrumbArrow />
      </router-link>
    </div>
    <div class="ml-auto w-12 z-10">
      <Hamburger />
    </div>
    <MenuOverlay />
  </div>
</template>

<script>
import NodeService from '../services/NodeService'
import MenuOverlay from '@/components/MenuOverlay'
import Hamburger from '@/components/Hamburger'
import BreadCrumbArrow from '@/components/BreadCrumbArrow'

export default {
  name: 'NavBar',
  components: {
    BreadCrumbArrow,
    Hamburger,
    MenuOverlay
  },
  computed: {
    node() {
      return this.$store.state.requestNode
    },
    breadcrumb() {
      const ns = new NodeService()
      return ns.nodify(this.$store.state.requestNode).breadcrumb()
    },
    upLink() {
      return this.breadcrumb[0]
    },
    breadcrumbVisible() {
      return this.$store.state.hamburgerClickEvent === 'openMainMenu'
    }
  },

  mounted() {
    this.$root.$on('openMainMenu', function() {
      this.$store.commit('setHamburgerClickEvent', 'closeMainMenu')
    })

    this.$root.$on('closeMainMenu', function() {
      this.$store.commit('setHamburgerClickEvent', 'openMainMenu')
    })
  }
}
</script>

<style lang="scss">
.gradient {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
