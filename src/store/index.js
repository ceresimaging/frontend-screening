import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    startDate: null,
    endDate: null,
    minMag: null,
    maxMag: null,
    resetSearch: false,
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
    resetSearch(state) {
      for (let key in state) {
        state[key] = null;
      }
      state.resetSearch = true;
    },
    clearResetSearch(state) {
      state.resetSearch = false;
    },
  },
  getters: {
    newMinMag: (state) => {
      return state.minMag;
    },
    newMaxMag: (state) => {
      return state.maxMag;
    },
    newStartTime: (state) => {
      return state.startDate;
    },
    newEndTime: (state) => {
      return state.endDate;
    },
    resetSearch: (state) => {
      return state.resetSearch;
    },
  },
});

export default store;
