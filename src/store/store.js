import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    earthQuakes: [],
    noData: false,
  },
  getters: {
    getEarthQuakes: (state) => state.earthQuakes,
    setNoData: (state) => state.noData,
  },
  actions: {
    async fetchEarthquakes({ commit }, { startTime, endTime, minmag }) {
      try {
        if (startTime && endTime && minmag) {
          const data = await Vue.axios.get(
            `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=${minmag}`
          );
          commit("SET_EARTHQU", data.data.features);
          commit("SET_NO_DATA", false);
          if (data.data.features.length === 0) {
            commit("SET_NO_DATA", true);
          }
        }
      } catch (error) {
        throw new Error(`API ${error}`);
      }
    },
  },
  mutations: {
    SET_EARTHQU(state, payload) {
      state.earthQuakes = payload;
    },
    SET_NO_DATA(state, payload) {
      state.noData = payload;
    },
  },
});
