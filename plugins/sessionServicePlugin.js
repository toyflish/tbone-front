import Vue from 'vue'
import SessionService from '../services/SessionService'

Vue.use({
  install: function (Vue) {
    if (!Vue.prototype.$sessionService) {
      let sessionService = new SessionService()
      Object.defineProperty(Vue.prototype, '$sessionService', { value: sessionService })
    }
  }
})
