import axios from "axios";

const state = () => ({
  datasiswa: [],
});
const mutations = {
  setDataSiswa(state, param) {
    state.datasiswa = param;
  },
};
const actions = {
  getSiswa(store) {
    axios
      .get("http://127.0.0.1:8000/api/siswa")
      .then((response) => {
        store.commit("setDataSiswa", response.data.data);
      })
      .catch((error) => console.log(error));
  },
};
export default {
  state,
  mutations,
  actions,
};
