import Vuex from 'vuex'
import NodeService from '../services/NodeService.js'

import node from '~/store/modules/node'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      node
    },
    state: {
      menuItems: [],
      breadCrumbItems: [],
      hamburgerClickEvent: 'openMainMenu'
    },
    mutations: {
      setMenuItems(state, items) {
        state.menuItems = items
      },
      setHamburgerClickEvent(state, ename) {
        state.hamburgerClickEvent = ename
      }
    },
    actions: {
      fetchMenu(context, payload) {
        const ns = new NodeService()
        return ns
          .fetchMenu()
          .then((items) => context.commit('setMenuItems', items))
      }
    }
  })
}

export default createStore
