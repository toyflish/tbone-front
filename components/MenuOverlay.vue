<template>
  <div class="overlay-menu" :class="{ open: menuOpen }">
    <nav>
      <ul>
        <li
          v-for="(item, index) in $store.state.menuItems"
          :key="index"
          style="height: 20%"
        >
          <router-link
            :to="{ path: item.href }"
            @click.native="$root.$emit('closeMainMenu')"
            >{{ item.link_name }}</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  computed: {
    menuOpen() {
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
  mounted() {}
}
</script>
<style lang="scss">
.overlay-menu {
  /* Overlay style */
  z-index: 9;

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 89, 100, 0.95);

  /* Effects */
  visibility: hidden;
  transform: translateY(60%) scale(0);
  transition: transform 0.4s, visibility 0s 0.4s;

  &.open {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    visibility: visible;
    transform: translateY(0%) scale(1);
    transition: transform 0.4s;
  }

  /* Menu style */
  nav {
    text-align: center;
    position: relative;
    top: 50%;
    height: 60%;
    transform: translateY(-50%);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: inline-block;
    height: 100%;
    position: relative;

    li {
      display: block;
      height: 20%;
      min-height: 54px;
      backface-visibility: hidden;

      a {
        text-decoration: none;
        text-shadow: none;
        background: none;
        font-size: 40px;
        font-weight: 300;
        display: block;
        color: #fff;
        transition: color 0.2s;

        &:hover,
        &:focus {
          color: #e3fcb1;
        }
      }
    }
  }

  @media (max-height: 600px) {
    nav {
      height: 70%;
      ul li a {
        font-size: 34px;
      }
      ul li {
        min-height: 34px;
      }
    }
  }
}
</style>
