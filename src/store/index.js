import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    startDate: null,
    endDate: null,
    minMag: null,
    maxMag: null,
  },
  mutations: {
    setStartDate(state, date) {
      state.startDate = date;
    },
    setEndDate(state, date) {
      state.endDate = date;
    },
    setMinMag(state, mag) {
      state.minMag = mag;
    },
    setMaxMag(state, mag) {
      state.maxMag = mag;
    },
  },
  getters: {
    newMinMag: (state) => {
      return state.minMag;
    },
  },
});

export default store;
