<template>
  <div>
    <v-container v-show="!loading">
      <h3>Dashboard</h3>
      <div class="d-flex mt-4">
        <v-card class="mx-2" color="#00b4d8" flat>
          <v-card-title class="body-2"> Siswa Mendaftar TKJ </v-card-title>
          <v-card-subtitle class="font-weight-bold">
            {{ jumlahtkj }} Orang
          </v-card-subtitle>
        </v-card>
        <v-card class="mx-2" color="#439534" flat>
          <v-card-title class="body-2"> Siswa Mendaftar TKR </v-card-title>
          <v-card-subtitle class="font-weight-bold">
            {{ jumlahtkr }} Orang
          </v-card-subtitle>
        </v-card>
      </div>
    </v-container>
    <v-overlay v-show="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
  <!-- <div class="mx-auto mt-12 text-center">
    <v-img :src="img" width="500"></v-img>
    Maaf, Fitur ini masih dalam pengembangan
  </div> -->
</template>
<script>
import axios from "axios";
export default {
  name: "DashboardAdmin",
  setup() {},
  created() {
    document.title = "Dashboard Admin";
  },
  data() {
    return {
      loading: false,
      jumlahtkr: null,
      jumlahtkj: null,
      img: require("@/assets/developo.jpg"),
    };
  },
  methods: {
    countTkr() {
      this.loading = true;
      axios
        .get("http://127.0.0.1:8000/api/siswa/jurusantkr")
        .then((response) => {
          this.jumlahtkr = response.data.data;
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
    countTkj() {
      this.loading = true;
      axios
        .get("http://127.0.0.1:8000/api/siswa/jurusantkj")
        .then((response) => {
          this.jumlahtkj = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
  mounted() {
    this.countTkr();
    this.countTkj();
  },
};
</script>
