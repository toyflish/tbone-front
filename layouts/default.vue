<template>
  <div>
    <nuxt />
  </div>
</template>
<styles lang="scss">
h1 {
  font-size: 2em;
  font-weight: 500;
}
h2,
h3,
h4,
h5,
h6 {
  font-size: 1.5em;
  font-weight: 500;
}

$font-color: #000;
$link-color: #48879a;
$link-color-hover: #111;
$subtitle-color: rgba(0, 0, 0, 0.44);

a {
  color: $link-color;
  text-decoration: none;
  transition: all 0.1s ease-out;

  &:hover {
    color: $link-color-hover;
  }
}

.container-text a {
  color: $link-color;
  padding: 10px 0;
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-size: 100% 1.5px;
  background-position: center bottom 27%;
  background-origin: padding-box;
  text-shadow: 3px 0 #fff, 2px 0 #fff, 1px 0 #fff, -1px 0 #fff, -2px 0 #fff, -3px 0 #fff;

  &:hover {
    color: $link-color-hover;
    text-decoration: none;
    background-size: 100% 2.5px;
    background-position: center bottom 25%;
  }
}

.subtitle {
  font-size: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  letter-spacing: 0;
  font-weight: 300;
  font-style: normal;
  color: $subtitle-color;
  fill: $subtitle-color;
}
</styles>
