import Vuex from 'vuex'
import NodeService from '../services/NodeService.js'
const store = new Vuex.Store({
  state: {
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
