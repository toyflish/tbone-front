<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50">
    <defs>
      <!-- the x and y "-50%" did the trick -->
      <filter id="dropshadow" height="200%" x="-50%" y="-50%" width="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <polygon points="20,40 40,40 30,25 40,10 20,10 10,25" fill="#fff" filter="url(#dropshadow)" />
  </svg>
</template>

<script>
export default {
  name: 'BreadCrumbArrow',
}
</script>
