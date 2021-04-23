import Vue from 'vue'
import Vuex from 'vuex'
import apis from '../apis/apis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      username: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: false
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = false
      window.localStorage.removeItem('userObj')
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const tokenInLocal = window.localStorage.getItem('userObj')
        const res = await apis.getUser(JSON.parse(tokenInLocal))
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        const { id, username, isAdmin } = res.data[0]
        commit('setCurrentUser', { id, username, isAdmin })
        return true
      } catch (err) {
        console.log(err.message)
        commit('revokeAuthentication')
      }
    },
  },
  modules: {
  }
})
