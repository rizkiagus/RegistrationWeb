<template>
  <div>
    <v-container ref="container">
      <h2 class="text-capitalize second--text text-center">Pembayaran</h2>
      <v-card tile>
        <v-list>
          <v-subheader>Rincian Pembayaran</v-subheader>
          <v-divider></v-divider>
          <v-list-item-group class="ps-4">
            <v-list-item-content>
              <v-list-item-title class="py-2"> Uang SPP</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="py-2">
                Uang Sarana (Lab. Bahasa, Lab. Komputer dll).
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="py-2">
                Uang Pembangunan</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item-group>
          <v-divider></v-divider>
          <div class="d-flex">
            <v-list-item-content class="ps-4">
              <v-list-item-title class="py-2">
                Total Pembayaran
              </v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <p class="pt-6 pe-3">Rp. 385.000</p>
          </div>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn
              class="text-capitalize indigo--text lighten-2 me-3"
              depressed
              outlined
              @click="pembayaran = !pembayaran"
            >
              batal
            </v-btn>
            <v-btn
              class="text-capitalize indigo lighten-2 white--text me-3"
              depressed
              @click="payment"
            >
              lanjutkan
            </v-btn>
          </div>
        </v-list>
        <v-dialog v-model="pembayaran" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Hati - Hati </v-card-title>
            <v-card-text
              >Apabila batal, anda akan kehilangan semua data yang sudah anda
              masukan sebelumnya. Apakah anda yakin?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="pembayaran = false">
                Batal
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="() => this.$router.push('/')"
              >
                Setuju
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/footer.vue";
import axios from "axios";
import router from "@/router";
export default {
  components: { Footer },
  name: "PembayaranView",
  data() {
    return {
      pembayaran: false,
    };
  },
  setup() {},
  computed: {
    tokenPayment() {
      return this.$store.state.auth.tokenpayment;
    },
    id() {
      return this.$store.state.auth.idsiswa;
    },
  },
  methods: {
    changestatus() {
      this.$store.dispatch("auth/update");
    },
    payment() {
      const idsiswa = this.id;
      window.snap.pay(`${this.tokenPayment}`, {
        onSuccess: function (result) {
          axios
            .post(`http://127.0.0.1:8000/api/siswa/${idsiswa}/update`, {
              status_bayar: "sudah bayar",
            })
            .then((response) => {
              router.push("/sukses");
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          console.log(result);
        },
      });
    },
  },
  async mounted() {
    let script = document.createElement("script");
    await script.setAttribute("src", "https://app.sandbox.midtrans.com/snap/snap.js");
    await script.setAttribute("data-client-key", "SB-Mid-client-MWdTlt34WEFUFtaF");
    await this.$refs.container.appendChild(script);
    console.log(this.id);
  },
};
</script>
