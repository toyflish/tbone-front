/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const maxWidth = '600px'

module.exports = {
  theme: {
    container: {
      center: true
    },
    screens: {
      sm: maxWidth,
      md: maxWidth,
      lg: maxWidth,
      xl: maxWidth
    },
    extend: {
      boxShadow: {
        code:
          '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.5)'
      }
    }
  },
  variants: {},
  plugins: []
}
