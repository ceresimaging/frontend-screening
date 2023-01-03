import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: '',
    searching: false,
    isError: false
  },
  getters: {
  },
  mutations: {
    setData(state, payload) {
      state.data = payload
    },
    setSearching(state, payload){
      state.searching = payload
    },
    setIsError(state, payload){
      state.isError = payload
    }
  },
  actions: {
    async getDataApi({ commit }, search) {
      commit('setIsError', false)
      commit('setSearching', true)
      const { starttime, endtime, minmagnitude } = search
      try {
        const res = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson', {
          params: {
            starttime, endtime, minmagnitude 
          }
        })
        commit('setData', res.data)
      } catch (error) {
        commit('setIsError', true)
      }
      commit('setSearching', false)
    },
  },
  modules: {},
});
