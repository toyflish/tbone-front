<template>
  <div class="fixed bottom-0 w-full gradient">
    <div class="container flex px-4 py-4">
      <div class="w-12">
        <nuxt-link
          v-if="breadcrumbVisible && upLink"
          :to="{ path: upLink.href }"
        >
          <BreadCrumbArrow />
        </nuxt-link>
      </div>
      <div class="ml-auto w-12 z-10">
        <Hamburger
          :shadow="hamburgerShadow"
          :open="hamburgerOpen"
          @click="hamburgerClick"
        />
      </div>
      <MenuOverlay />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
    ...mapState({
      node: (state) => state.node,
      nav: (state) => state.nav
    }),
    ...mapGetters('node', ['currentHydrated', 'breadcrumb']),
    ...mapGetters('nav', ['hamburgerShadow', 'hamburgerOpen']),
    upLink() {
      return this.breadcrumb[0]
    },
    breadcrumbVisible() {
      return this.$store.state.hamburgerClickEvent === 'openMainMenu'
    }
  },
  methods: mapActions('nav', ['hamburgerClick'])
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
