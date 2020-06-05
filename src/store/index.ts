import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginForm: false,
    targetUrl: '',
  },
  mutations: {
    updateLoginState(state) {
      state.isLogin = !state.isLogin
    },
    updateShowFormState(state) {
      state.loginForm = !state.loginForm
    },
    alterTargetUrlValue(state, val) {
      state.targetUrl = val
    }
  },
  actions: {
  },
  modules: {
  }
})
