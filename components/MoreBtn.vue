<template>
  <div :class="{ loading: loading }" class="more-btn">
    <a @click.prevent.stop="$emit('hit')" href="/archive">{{ label }}</a>
  </div>
</template>

<script>
export default {
  name: 'MoreButton',
  props: {
    label: {
      type: String,
      default: 'More'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // trigger click if window scrollposition is one window-height away
    const options = {
      rootMargin: `${window.innerHeight}px`,
      threshold: 1.0
    }
    const target = this.$el
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) this.$emit('hit')
      })
    }
    this.observer = new IntersectionObserver(callback, options)
    this.observer.observe(target)
  },
  beforeDestroy() {
    this.observer.disconnect()
  }
}
</script>

<style lang="scss">
$more-btn-color: #222;
$more-btn-color-hover: pink;

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.more-btn {
  cursor: pointer;
  width: 120px;
  height: 120px;
  display: table;
  margin: 60px auto 0;
  position: relative;
  position: relative;
  a {
    color: $more-btn-color;
    display: table-cell;
    font-size: 12px;
    padding: 0 9px;
    position: relative;
    text-align: center;
    vertical-align: middle;

    font-weight: 600;
    text-transform: uppercase;

    &:hover {
      color: $more-btn-color-hover;
    }
  }
  &:before {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    border-color: $more-btn-color;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
  }
  &:hover:before {
    border-color: $more-btn-color-hover;
  }
  &.loading {
    a {
      color: $more-btn-color-hover;
    }
    &:before {
      border-color: $more-btn-color-hover;
    }
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    margin-bottom: 60vh;
  }
}
</style>
