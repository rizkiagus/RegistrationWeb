<template>
  <div class="indigo lighten-5">
    <div class="main">
      <v-container>
        <v-form
          class="my-5"
          ref="form"
          v-model="valid"
          @submit.prevent="daftar"
        >
          <div class="datadirisiswa">
            <v-img :src="urllogo" width="100" class="mx-auto"></v-img>
            <h2 class="text-capitalize second--text text-center">
              formulir pendaftaran siswa baru
            </h2>
            <h3 class="text-capitalize font-weight-thin">data diri siswa</h3>
            <v-divider class="second mb-5"></v-divider>
            <v-row>
              <v-col cols="12">
                <v-select
                  dense
                  :items="['2022/2023', '2023/2024', '2024/2025', '2025/2026']"
                  label="Pilih Tahun Ajaran"
                  required
                  v-model="siswa.tahun_ajaran"
                  :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                  outlined
                ></v-select>
                <v-text-field
                  label="Masukan Nama Lengkap"
                  outlined
                  dense
                  required
                  v-model="siswa.nama"
                  :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                ></v-text-field>
                <!--tempat lahir tanggal lahir sampe bawah-->
                <v-row>
                  <v-col cols="7">
                    <v-text-field
                      label="Masukan Tempat Lahir"
                      outlined
                      v-model="siswa.tempat_lahir"
                      dense
                      required
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                    ></v-text-field>
                    <v-select
                      dense
                      :items="jeniskelamin"
                      label="Pilih Jenis Kelamin"
                      required
                      v-model="siswa.jenis_kelamin"
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                      outlined
                    ></v-select>
                    <v-text-field
                      label="Masukan Sekolah Asal"
                      outlined
                      v-model="siswa.sekolah_asal"
                      required
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                      dense
                    ></v-text-field>
                    <v-textarea
                      outlined
                      label="Masukan Alamat Lengkap"
                      auto-grow
                      v-model="siswa.alamat"
                      row-height="15"
                      required
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                    >
                    </v-textarea>
                    <v-select
                      outlined
                      dense
                      v-model="siswa.jurusan"
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                      label="Pilih Jurusan Yang Ingin Di Ambil"
                      :items="[
                        'SMK: Teknik Komputer Jaringan',
                        'SMK: Teknik Kendaraan Ringan',
                      ]"
                    >
                    </v-select>
                  </v-col>

                  <v-col cols="5">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="siswa.tgl_lahir"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dense
                          outlined
                          required
                          :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                          v-model="siswa.tgl_lahir"
                          label="Tanggal Lahir"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="siswa.tgl_lahir"
                        no-title
                        scrollable
                        :max="getEndDate"
                        min="1990-06-15"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(siswa.tgl_lahir)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-select
                      dense
                      :items="agama"
                      label="Pilih Agama"
                      v-model="siswa.agama"
                      required
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                      outlined
                    ></v-select>
                    <v-text-field
                      label="Nomor Telepon"
                      outlined
                      dense
                      v-model="siswa.telp"
                      required
                      counter="13"
                      :rules="[
                        (v) => !!v || 'Tidak Boleh Kosong',
                        (v) => v.length <= 13 || 'Max 13 Karakter',
                        (v) => v.length >= 12 || 'Min 12 Karakter',
                      ]"
                      type="number"
                    >
                    </v-text-field>

                    <v-file-input
                      accept="image/*"
                      label="Masukan Pas Foto Uk. 3x4"
                      outlined
                      dense
                      required
                      v-model="foto"
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                      show-size
                      counter
                      class="mt-10"
                    ></v-file-input>
                    <v-text-field
                      label="Email"
                      outlined
                      dense
                      :rules="[
                        (email) => !!email || 'Tidak Boleh Kosong',
                        (email) =>
                          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                            email
                          ) || 'Pastikan E-mail Anda Benar',
                      ]"
                      v-model="siswa.email"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>

                <!--data orangtua-->
                <h3 class="text-capitalize font-weight-thin">
                  data orang tua / wali
                </h3>
                <v-divider class="second mb-5"></v-divider>
                <v-text-field
                  label="Masukan Nama Orang Tua/Wali"
                  outlined
                  dense
                  required
                  v-model="orangtua.nama"
                  :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                ></v-text-field>
                <v-row>
                  <v-col cols="7">
                    <v-textarea
                      outlined
                      label="Masukan Alamat Orang Tua"
                      dense
                      auto-grow
                      row-height="15"
                      v-model="orangtua.alamat"
                      required
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      outlined
                      dense
                      label="Nomor Telepon Orang Tua"
                      required
                      type="number"
                      v-model="orangtua.telp"
                      counter="13"
                      :rules="[
                        (v) => !!v || 'Tidak Boleh Kosong',
                        (v) => v.length <= 13 || 'Max 13 Karakter',
                        (v) => v.length >= 12 || 'Min 12 Karakter',
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!--data berkas sekolah-->
                <h3 class="text-capitalize font-weight-thin">
                  Data Berkas Sekolah
                </h3>
                <v-divider class="second mb-5"></v-divider>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="Nilai SKHUN"
                      outlined
                      dense
                      required
                      v-model="berkas.nilai_skhun"
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                    ></v-text-field>
                    <v-text-field
                      label="Nilai Ijazah"
                      outlined
                      dense
                      v-model="berkas.nilai_ijazah"
                    ></v-text-field>
                    <v-file-input
                      accept="document/*"
                      label="Masukan SKHUN anda"
                      outlined
                      dense
                      show-size
                      counter
                      required
                      v-model="skhun"
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Tahun Lulus"
                      outlined
                      dense
                      required
                      v-model="berkas.tahun"
                      :rules="[(v) => !!v || 'Tidak Boleh Kosong']"
                    ></v-text-field>
                    <v-file-input
                      accept="document/*"
                      label="Masukan Ijazah anda"
                      outlined
                      v-model="ijazah"
                      dense
                      show-size
                      counter
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-checkbox
              required
              :rules="[(v) => !!v || 'Anda harus setuju untuk melanjutkan']"
            >
              <template v-slot:label>
                <div>
                  Saya setuju dengan
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <a
                        @click.stop
                        v-on="on"
                        @click="persyaratanDialog = !persyaratanDialog"
                      >
                        Persyaratan
                      </a>
                    </template>
                    Buka Dialog
                  </v-tooltip>
                  YAPIM Indrapura
                </div>
              </template>
            </v-checkbox>
            <v-dialog v-model="persyaratanDialog">
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  PERNYATAAN
                </v-card-title>

                <v-card-text>
                  <p>
                    1. Saya sebagai siswa/i Sekolah YAPIM, berjanji akan
                    mentaati semua Tata Tertib yang berlaku di sekolah YAPIM.
                  </p>
                  <p>
                    2. Saya sebagai siswa/i Sekolah YAPIM akan selalu rajin
                    belajar dan akan tetapi menjaga nama baik sekolah YAPIM,
                    serta akan selalu hormat dan sopan kepada Bapak/Ibu guru di
                    dalam maupun luar sekolah.
                  </p>
                  <p>
                    3. Saya sebagai siswa/i Sekolah YAPIM, menyadari dengan
                    sepenuhnya bahwa jika saya berdisiplin tinggi, maka saya
                    akan berprestasi dan berguna bagi Nusa dan Bangsa.
                  </p>
                  <p>
                    4. Jika saya melanggar Tata tertib Sekolah, saya bersedia
                    diambil tindakan sesuai dengan sanksi - sanksi yang ada pada
                    tata tertib sekolah, dan bersedia dikeluarkan dari sekolah
                    YAPIM.
                  </p>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn plain text @click="persyaratanDialog = false">
                    Saya Setuju
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn
                class="text-capitalize indigo--text lighten-2 mx-2"
                depressed
                outlined
                @click="() => this.$router.push('/')"
              >
                Batal
              </v-btn>
              <v-btn
                class="text-capitalize indigo lighten-2 white--text mx-2"
                depressed
                :disabled="!valid"
                @click="validate"
                type="submit"
              >
                Bayar
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-container>
    </div>
    <Footer />
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import Footer from "@/components/footer.vue";
import axios from "axios";
import router from "@/router";
export default {
  components: { Footer },
  name: "PendaftaranView",
  data() {
    return {
      urllogo: require("@/assets/logoinpur.png"),
      persyaratanDialog: false,
      pembayaran: false,
      valid: false,
      menu: false,
      modal: false,
      date: new Date(),
      jeniskelamin: ["Laki-Laki", "Perempuan"],
      agama: ["Islam", "Kristen", "Hindu", "Budha", "Lainnya"],
      orangtua: {
        siswa_id: "",
        nama: "",
        alamat: "",
        telp: "",
      },
      berkas: {
        siswa_id: "",
        nilai_skhun: "",
        nilai_ijazah: "",
        ijazah_image: "",
        skhun_image: "",
        tahun: "",
      },
      foto: null,
      ijazah: null,
      skhun: null,
      siswa: {
        nama: "",
        jenis_kelamin: "",
        tgl_lahir: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        tempat_lahir: "",
        agama: "",
        alamat: "",
        email: "",
        sekolah_asal: "",
        pass_foto: "",
        status_bayar: "belum bayar",
        telp: "",
        jurusan: "",
        tahun_ajaran:"",
      },
      loading: false,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate;
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async daftar() {
      this.loading = true;
      await this.getBase64(this.foto).then((data) => {
        this.siswa.pass_foto = data;
      });
      this.getBase64(this.ijazah).then((data) => {
        this.berkas.ijazah_image = data;
      });
      this.getBase64(this.skhun).then((data) => {
        this.berkas.skhun_image = data;
      });
      await axios
        .post("http://127.0.0.1:8000/api/daftar", this.siswa)
        .then((response) => {
          this.orangtua.siswa_id = response.data.data.id_siswa;
          this.berkas.siswa_id = response.data.data.id_siswa;
          this.$store.dispatch("auth/setId", response.data.data.id_siswa);
          this.$store.dispatch("auth/setToken", response.data.data.token);
          axios
            .post("http://127.0.0.1:8000/api/orangtua", this.orangtua)
            .then((response) => {
              axios
                .post("http://127.0.0.1:8000/api/berkas", this.berkas)
                .then((response) => {
                  router.push("/pembayaran");
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
              console.log(response);
              this.loading = false;
            })
            .catch((error) => {
              console.log(error);
              this.loading = false;
            });
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading;
    },
    getEndDate() {
     const endDate = new Date();
     return endDate.toISOString().slice(0,10)
    },
  },
  created() {
    document.title = "Formulir";
  },
  setup() {},
};
</script>
