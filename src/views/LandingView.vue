<template>
  <div>
    <navbar />
    <v-parallax src="@/assets/hero.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="text-h4">
            <span class="white--text px-6 font-weight-bold">
              PENERIMAAN SISWA BARU YAPIM Indrapura
            </span>
          </h1>
          <h4 class="subheading text-capitalize pt-0 mt-0 mb-4">
            <span class="px-6"> daftarkan diri anda sekarang! </span>
          </h4>
          <v-btn
            color="indigo lighten-1 text-capitalize white--text"
            depressed
            to="/pendaftaran"
          >
            daftar sekarang
          </v-btn>
        </v-col>
      </v-row>
    </v-parallax>
    <div class="main">
      <v-container>
        <p class="indigo--text text-caption mb-0 pb-0">
          Kenapa Harus YAPIM Indrapura?
        </p>
        <h2 class="second--text mb-5">Mengedepankan Kurikulum Terbaru</h2>
        <div class="listcard">
          <v-row>
            <v-col cols="3" v-for="(list, index) in fitur" :key="index">
              <v-card height="250" hover color="third" outlined>
                <v-img
                  class="imgcard mt-4 ms-4 mb-0"
                  :src="list.icon"
                  alt="Image"
                  width="40"
                  height="40"
                >
                </v-img>
                <v-card-title
                  class="body-1 font-weight-bold mb-3 text-capitalize"
                >
                  {{ list.title }}
                </v-card-title>
                <v-card-subtitle>
                  {{ list.description }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
    <div class="pertanyaan">
      <v-container>
        <h2 class="second--text my-5 text-center">
          Pertanyaan Yang Sering Ditanyakan
        </h2>
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="(listask, i) in ask"
            :key="i"
            class="my-1 rounded-lg"
          >
            <v-expansion-panel-header
              class="font-weight-bold second--text text-capitalize"
            >
              {{ listask.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="caption">
              {{ listask.description }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>
    <div class="bergabung">
      <v-container>
        <div class="indigo lighten-5 text-center">
          <h2 class="second--text py-2">
            Tunggu Apa Lagi? Daftarkan Diri Anda Sekarang
          </h2>
          <p class="body-1 indigo--text">
            Dengan bergabung anda akan mendapatkan berbagai ilmu menarik dan
            terupdate
          </p>
          <v-btn
            class="text-capitalize indigo white--text mb-4"
            depressed
            to="/pendaftaran"
          >
            daftar sekarang
          </v-btn>
        </div>
      </v-container>
    </div>
    <Footer />
  </div>
</template>
<script>
import navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";

export default {
  components: { navbar, Footer },
  name: "LandingView",
  setup() {},
  data() {
    return {
      fitur: [
        {
          title: "Lab Komputer",
          icon: require("@/assets/pc.png"),
          description: "Adanya lab komputer untuk membantu sistem belajar",
        },
        {
          title: "Lab Bahasa",
          icon: require("@/assets/conference.png"),
          description:
            "Adanya lab bahasa inggris untuk membantu siswa untuk belajar berbahasa inggris",
        },
        {
          title: "perpustakaan",
          icon: require("@/assets/book.png"),
          description:
            "Adanya perpustakaan memudahkan para siswa untuk belajar dan membaca",
        },
        {
          title: "Ruang Praktek",
          icon: require("@/assets/practice.png"),
          description: "Menyediakan layanan ruang praktek untuk siswa",
        },
      ],
      ask: [
        {
          title: "Berapa Biaya Pendaftaran?",
          description:
            "Biaya pendaftaran sebesar Rp. 385.000. Dimana biaya tersebut sudah termasuk untuk SPP bulan pertama, uang sarana, seperti laboratorium komputer, laboratorium bahasa dan uang pembangunan.",
        },
        {
          title: "Apakah ada eskul?",
          description:
            "Tentu saja ada, ada beberapa eskul yang bisa anda ikuti, seperti futsall, basket, volly dan masih banyak lagi.",
        },
        {
          title: "Apa saja yang perlu saya siapkan untuk mendaftar?",
          description:
            "Siswa hanya perlu menyiapkan SKHUN asli, IJAZAH asli, pas foto 3 x 4, pas foto 3 x 2, dan Kartu Keluarga.",
        },
        {
          title: "Apa benefit yang saya ketika mendaftar?",
          description:
            "Mendapatkan bakal pakaian kotak-kotak dan pakaian olahraga.",
        },
      ],
    };
  },
  created() {
    document.title = "Yapim Indrapura";
  },
};
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>
