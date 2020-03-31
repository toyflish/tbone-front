import Vue from 'vue'
import Vuex from 'vuex'
import { configure } from '@storybook/vue'
import '@/assets/css/tailwind.css'
Vue.use(Vuex)
function loadStories() {
  const req = require.context('../components', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}
configure(loadStories, module)