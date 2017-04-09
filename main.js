
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'normalize.css/normalize.css'
import './css/denormalize.scss'

import Vue from 'vue'
import NavBar from './components/NavBar'
import Home from './components/Home'
import NodeDispatcher from './components/NodeDispatcher'
import NodeService from './services/NodeService'

import VueRouter from 'vue-router'
import Vuex from 'vuex'

import VueAnalytics from 'vue-analytics'

const apiUrl = process.env.API_URL

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  strict: true,
  state: {
    requestNode: {name: 'initial'},
    nodeService: new NodeService(),
    apiUrl: apiUrl,
    hamburgerClickEvent: 'openMainMenu'
  },
  mutations: {
    setRequestNode (state, node) {
      state.requestNode = node
    },
    setHamburgerClickEvent: function (state, ename) {
      state.hamburgerClickEvent = ename
    }
  }
})

// Title change on Node change
let setDocumentTitle = function (title) {
  document.title = title
}
let setDocumentTitleByRequestNode = function () {
  setDocumentTitle(store.state.requestNode.title)
}
store.watch(
  function (state) {
    return state.requestNode
  }, setDocumentTitleByRequestNode
)

Vue.filter('date', function (value) {
  return (value === null || value === undefined || value === '') ? '' : (new Date(value)).toLocaleDateString()
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: NodeDispatcher
    },
    {
      path: '/:slug/:highlight',
      name: 'nodeSlugHighlight',
      component: NodeDispatcher
    },
    {
      path: '/:slug',
      name: 'nodeSlug',
      component: NodeDispatcher
    }
  ]
})

// activate analytics only on production
if (process.env.NODE_ENV === 'production') {
  const analyticsId = 'UA-627798-1'
  Vue.use(VueAnalytics, { id: analyticsId, router: router })
}

/* eslint-disable no-new */
window.v = new Vue({
  router,
  store,
  el: '#app',
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
  `
})
