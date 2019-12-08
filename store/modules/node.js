import NodeService from '../../services/NodeService.js'
const nodes = new NodeService()

export default {
  namespaced: true,
  state: {
    current: { name: 'initial' },
    breadCrumbItems: []
  },
  mutations: {
    SET_CURRENT(state, node) {
      state.current = node
      state.breadCrumbItems = node.breadcrumb()
    }
  },
  actions: {
    fetchCurrent({ commit }, params) {
      return nodes.fetchBySlug(params).then((node) => {
        if (node.slug !== 'selfies' && node.visibility === 'hidden')
          throw new Error({
            statusCode: 404,
            message: `${node.slug} visibility: hidden`
          })
        commit('SET_CURRENT', node)
      })
    }
  },
  getters: {
    currentHydrated: (state) => nodes.nodify(state.current),
    breadcrumb: (_, getters) => getters.currentHydrated.breadcrumb()
  }
}
