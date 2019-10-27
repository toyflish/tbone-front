import Vuex from 'vuex'
import NodeService from '../services/NodeService.js'
const createStore = () => {
  return new Vuex.Store({
    state: {
      requestNode: { name: 'initial' },
      menuItems: [],
      breadCrumbItems: [],
      hamburgerClickEvent: 'openMainMenu'
    },
    mutations: {
      setRequestNode(state, node) {
        state.requestNode = node
        state.breadCrumbItems = node.breadcrumb()
      },
      setMenuItems(state, items) {
        state.menuItems = items
      },
      setHamburgerClickEvent(state, ename) {
        state.hamburgerClickEvent = ename
      }
    },
    actions: {
      fetchRequestNode(context, params) {
        const ns = new NodeService()
        return ns.fetchBySlug(params).then((node) => {
          if (node.slug !== 'selfies' && node.visibility === 'hidden')
            throw new Error({
              statusCode: 404,
              message: `${node.slug} visibility: hidden`
            })
          context.commit('setRequestNode', node)
        })
      },
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
