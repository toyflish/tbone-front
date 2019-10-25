module.exports = {
  env: {
    API_URL: process.env.API_URL || 'http://toyflish.dev'
  },

  css: [
    'normalize.css/normalize.css',
    { src: '~assets/denormalize.scss', lang: 'scss' }
  ],
  plugins: [
    '~plugins/filters.js'
  ],
  modules: [
    ['@nuxtjs/google-analytics', { ua: 'UA-627798-1' }],
    '@nuxtjs/apollo'
  ],
  apollo: {
    networkInterfaces: {
      default: '~/apollo/network-interfaces/default.js'
      // test: '~/apollo/network-interfaces/test.js'
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Kai Rautenberg',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
