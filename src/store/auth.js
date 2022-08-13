import router from "@/router";
import axios from "axios";
const cookie = require("tiny-cookie");

const state = () => ({
  datalogin: {},
  token: null,
  isLoading: false,
  message: "",
  tokenpayment: null,
  idsiswa: "",
});
const mutations = {
  setDataLogin(state, param) {
    state.datalogin = param;
  },
  setToken(state, param) {
    state.token = param;
  },
  setIsLoading(state, param) {
    state.isLoading = param;
  },
  setMessage(state, param) {
    state.message = param;
  },
  setTokenPayment(state, param) {
    state.tokenpayment = param;
  },
  setIdSiswa(state, param) {
    state.idsiswa = param;
  },
};
const actions = {
  setToken(store, param) {
    store.commit("setTokenPayment", param);
  },
  setId(store, param) {
    store.commit("setIdSiswa", param);
  },
  async login(store, param) {
    store.commit("setIsLoading", true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        param
      );
      if (response.status == 200) {
        cookie.set("token", response.data.data.access_token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        store.commit("setIsLoading", false);
        store.commit("setMessage", response.data.code);
        store.commit("setDataLogin", response.data.data.user);
        store.commit("setToken", response.data.data.access_token);
      } else {
        console.log(response.status);
        store.commit("setIsLoading", false);
        console.log(response.data.code);
        store.commit("setMessage", response.data.code);
      }
    } catch (error) {
      store.commit("setIsLoading", false);
      console.log(error);
      store.commit("setMessage", 400);
    }
  },
  async addorgtua(store, param) {
    store.commit("setIsLoading", true);
    const response = await axios.post(
      "http://127.0.0.1:8000/api/orangtua",
      param
    );
    if (response.status == 200) {
      store.commit("setIsLoading", false);
      console.log(response);
    } else {
      console.log(response);
    }
  },
  async addberkas(store, param) {
    store.commit("setIsLoading", true);
    const response = await axios.post(
      "http://127.0.0.1:8000/api/berkas",
      param
    );
    if (response.status == 200) {
      store.commit("setIsLoading", false);
      console.log(response);
    } else {
      console.log(response);
    }
  },
  async daftar(store, param) {
    store.commit("setIsLoading", true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/daftar",
        param
      );
      if (response.status == 200) {
        store.commit("setTokenPayment", response.data.data.token);
        store.commit("setIdSiswa", response.data.data.id_siswa);
        store.commit("setIsLoading", false);
        router.push("/pembayaran");
      } else {
        console.log(response.status);
        store.commit("setIsLoading", false);
      }
    } catch (error) {
      console.log(error);
      store.commit("setIsLoading", false);
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
