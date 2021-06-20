import { ref } from '@nuxtjs/composition-api'

const navOpen = ref(false)
export const useNav = () => {
  const hamburgerShadow = ref(true)
  const openNav = () => {
    navOpen.value = true
  }
  const closeNav = () => {
    navOpen.value = false
  }
  const toggleNav = () => {
    navOpen.value = !navOpen.value
  }
  return {
    navOpen,
    hamburgerShadow,
    openNav,
    closeNav,
    toggleNav,
  }
}
