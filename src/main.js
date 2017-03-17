// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'normalize.css/normalize.css'
// import './css/denormalize.scss'
require('!style-loader!css-loader!sass-loader!./css/denormalize.scss')

import Vue from 'vue'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Goals from './components/Goals'
import Achievements from './components/Achievements'
import NodeDispatcher from './components/NodeDispatcher'

import VueRouter from 'vue-router'
import Vuex from 'vuex'

import VueAnalytics from 'vue-analytics'

const apiUrl = process.env.API_URL
console.log('api url', apiUrl)

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  strict: true,
  state: {
    activeNode: {name: 'initial'},
    apiUrl: apiUrl
  },
  mutations: {
    setActiveNode (state, node) {
      console.log('Store:mutations:setActiveNode', node)
      state.activeNode = node
    }
  }
})

// Title change on Node change
let setDocumentTitle = function (title) {
  document.title = title
}

let setDocumentTitleByActiveNode = function () {
  setDocumentTitle(store.state.activeNode.title)
}

store.watch(
  function (state) {
    return state.activeNode
  }, setDocumentTitleByActiveNode
)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/goals',
      component: Goals
    },
    {
      path: '/achievements',
      component: Achievements
    },
    {
      path: '/',
      name: 'root',
      component: NodeDispatcher
    },
    {
      path: '/:slug',
      name: 'nodeSlug',
      component: NodeDispatcher
    }
  ]
})

const id = 'UA-627798-1'
Vue.use(VueAnalytics, { id, router })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  data: function () {
    return {
      // node: {}
    }
  },
  components: {
    Home,
    NodeDispatcher,
    NavBar
  },
  template: `
    <div class="container main">
      <navBar></navBar>
      <router-view :key="$route"></router-view>
    </div>
  `,
  computed: {
    node: function () {
      console.log('Main::computed:node')
      return this.$store.state.activeNode
    }

  }
})
