export default {
  namespaced: true,
  state: {
    state: 'closed',
  },
  mutations: {
    SET_STATE(state, mode) {
      state.state = mode
    },
  },
  actions: {
    swiperOpen({ commit }) {
      commit('SET_STATE', 'swiperOverlayOpen')
    },
    swiperClose({ commit }) {
      commit('SET_STATE', 'closed')
    },
    hamburgerClick({ commit, state }) {
      commit('SET_STATE', state.state === 'closed' ? 'menuOverlayOpen' : 'closed')
    },
    closeMenu({ commit }) {
      commit('SET_STATE', 'closed')
    },
  },
  getters: {
    hamburgerOpen: ({ state }) => state !== 'closed',
    hamburgerShadow: ({ state }) => state === 'closed' || state === 'swiperOverlayOpen',
    menuOverlayOpen: ({ state }) => state === 'menuOverlayOpen',
    swiperOverlayOpen: ({ state }) => state === 'swiperOverlayOpen',
  },
}
