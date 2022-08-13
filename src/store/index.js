import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import siswa from "./siswa";
import createPresistedState from "vuex-persistedstate";

Vue.use(Vuex);

const presistedDataState = createPresistedState({
  paths: ["auth"],
});

export default new Vuex.Store({
  plugins: [presistedDataState],
  modules: {
    auth: {
      namespaced: true,
      ...auth,
    },
    siswa: {
      namespaced: true,
      ...siswa,
    },
  },
});
