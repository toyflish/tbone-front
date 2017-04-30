import Vuex from 'vuex'
import NodeService from '../services/NodeService.js'
const store = new Vuex.Store({
  state: {
    pendingSessionCheck: false,
    currentUser: {
      signedIn: false,
      email: '',
      id: null
    },
    requestNode: {name: 'initial'},
    menuItems: [],
    breadCrumbItems: [],
    hamburgerClickEvent: 'openMainMenu'
  },
  mutations: {
    setRequestNode (state, node) {
      state.requestNode = node
      state.breadCrumbItems = node.breadcrumb()
    },
    setMenuItems (state, items) {
      state.menuItems = items
    },
    setHamburgerClickEvent: function (state, ename) {
      state.hamburgerClickEvent = ename
    },
    currentUserSignedIn: function (state, userData) {
      state.currentUser.signedIn = true
      state.currentUser.email = userData.email
      state.currentUser.id = userData.id
    },
    currentUserSignedOut: function (state) {
      state.currentUser.signedIn = false
      state.currentUser.email = ''
      state.currentUser.id = null
    },
    setPendingSessionCheck: function (state, value) {
      state.pendingSessionCheck = value
    }
  },
  actions: {
    fetchRequestNode (context, payload) {
      let ns = new NodeService()
      return ns.fetchBySlug(payload).then((node) => context.commit('setRequestNode', node))
    }
  }
})

export default store
