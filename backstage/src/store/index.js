import { createStore } from 'vuex'
import persist from 'vuex-persistedstate'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    new persist({
      storage: window.localStorage,
    }),
  ],
})
