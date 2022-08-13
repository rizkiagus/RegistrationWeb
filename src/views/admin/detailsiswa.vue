<template>
  <div>
    <v-container>
      <h2 class="second--text text-center">Data Diri Siswa</h2>
      <div class="datasiswa">
        <h4 class="font-weight-bold second--text">Data Siswa</h4>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="2">
            <p>Nama</p>
            <p class="mb-12">Alamat</p>
            <p>Agama</p>
            <p>Tempat /TglLahir</p>
            <p>Sekolah Asal</p>
            <p>No. HP</p>
          </v-col>
          <v-col cols="6">
            <p class="text-capitalize">: {{ data.nama }}</p>
            <p class="text-capitalize mb-12">: {{ data.alamat }}</p>
            <p class="text-capitalize">: {{ data.agama }}</p>
            <p class="text-capitalize mb-10">
              : {{ data.tempat_lahir }}, {{ data.tgl_lahir }}
            </p>
            <p class="text-capitalize">: {{ data.sekolah_asal }}</p>
            <p class="text-capitalize">: {{ data.telp }}</p>
          </v-col>
          <v-col cols="4">
            <v-img :src="data.pass_foto"></v-img>
          </v-col>
        </v-row>
      </div>
      <div class="dataorangtua">
        <h4 class="font-weight-bold second--text">Data Orang Tua / Wali</h4>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="2">
            <p>Nama</p>
            <p class="mb-12">Alamat</p>
            <p>No. HP</p>
          </v-col>
          <v-col>
            <p class="text-capitalize">: {{ data.orangtua.nama }}</p>
            <p class="text-capitalize mb-12">: {{ data.orangtua.alamat }}</p>

            <p class="text-capitalize">: {{ data.orangtua.telp }}</p>
          </v-col>
        </v-row>
      </div>
      <div class="berkas pb-4">
        <h4 class="font-weight-bold second--text">Data Orang Tua / Wali</h4>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="3">
            <p>Lulus Tahun</p>
            <p>Nilai SKHUN</p>
            <p>Nilai Ijazah</p>
            <p>Download SKHUN</p>
            <p>Download Ijazah</p>
          </v-col>
          <v-col>
            <p class="text-capitalize">: {{ data.berkas.tahun }}</p>
            <p class="text-capitalize">: {{ data.berkas.nilai_skhun }}</p>
            <p class="text-capitalize">
              : {{ data.berkas.nilai_ijazah ? data.berkas.nilai_ijazah : "-" }}
            </p>
            <p class="text-capitalize">
              :
              <a :href="data.berkas.skhun_image" download="skhun" _blank>
                Download Skhun
              </a>
            </p>
            <p class="text-capitalize">
              :
              <span v-if="!data.berkas.ijazah">Tidak Ada Ijazah</span>
              <a :href="data.berkas.ijazah_image" download="ijazah" v-else>
                Download Ijazah
              </a>
            </p>
          </v-col>
        </v-row>
      </div>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn
          class="text-capitalize indigo--text lighten-2"
          outlined
          @click="() => this.$router.push('/siswa')"
        >
          Kembali
        </v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "DetailSiswaVue",
  setup() {},
  data() {
    return {
      id: null,
      data: {},
    };
  },
  methods: {
    getdatasiswa() {
      axios
        .get(`http://127.0.0.1:8000/api/siswa/detail/${this.$route.params.id}`)
        .then((response) => {
          this.data = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getdatasiswa();
  },
};
</script>
