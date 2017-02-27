// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'normalize.css/normalize.css'
import './css/denormalize.css'

import Vue from 'vue'
import App from './App'
import Selfies from './components/Selfies'
import Goals from './components/Goals'
import Achievements from './components/Achievements'
import Archive from './components/Archive'
import Node from './components/Node'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
      path: '/archive',
      component: Archive
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
  el: '#app',
  template: '<App />',
  components: { App },
  methods: {
    addGoal: function (name) {
      this.$firebaseRefs.goals.push({name: name})
    }
  }
})
