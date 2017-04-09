import Vuex from 'vuex'
import NodeService from '../services/NodeService.js'
const store = new Vuex.Store({
  state: {
    requestNode: {name: 'initial'},
    menuItems: [],
    nodeService: new NodeService(),
    hamburgerClickEvent: 'openMainMenu'
  },
  mutations: {
    setRequestNode (state, node) {
      state.requestNode = node
    },
    setMenuItems (state, items) {
      state.menuItems = items
    },
    setHamburgerClickEvent: function (state, ename) {
      state.hamburgerClickEvent = ename
    }
  }
})

export default store
