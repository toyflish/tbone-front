// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'normalize.css/normalize.css'
// import './css/denormalize.scss'
require('!style-loader!css-loader!sass-loader!./css/denormalize.scss')

import Vue from 'vue'
import App from './App'
import Selfies from './components/Selfies'
import Goals from './components/Goals'
import Achievements from './components/Achievements'
import Node from './components/Node'

import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  strict: true,
  state: {
    activeNode: {name: 'initial'}
  },
  mutations: {
    setActiveNode (state, node) {
      console.log('mutations::setActiveNode', node)
      state.activeNode = node
    }
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Selfies
    },
    {
      path: '/goals',
      component: Goals
    },
    {
      path: '/achievements',
      component: Achievements
    },
    {
      path: '/:slug',
      component: Node
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App />',
  components: { App },
  methods: {
    addGoal: function (name) {
      this.$firebaseRefs.goals.push({name: name})
    }
  }
})
