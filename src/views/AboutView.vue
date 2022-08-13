<template>
  <div class="about">
    <navbar />
    <div class="main">
      <v-carousel cycle hide-delimiters>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
      <v-container class="pt-0">
        <div class="text text-center mt-6">
          <h1 class="second--text pb-0 mb-0">
            SELAMAT DATANG DI <span class="indigo--text">YAPIM INDRAPURA</span>
          </h1>
          <p class="body-2">
            Kami merupakan sekolah swasta yang berada di Indrapura, tepatnya
            dijalan lintas sumatera KM.108. Kami percaya dengan visi dan misi
            kami dapat menjadikan siswa yang berkompeten dan dapat bersaing di
            dunia pekerjaan
          </p>
        </div>
        <div class="visimisi">
          <v-row>
            <v-col cols="6">
              <v-card height="250" color="indigo lighten-2">
                <v-card-title class="white--text">Visi Kami</v-card-title>
                <v-card-subtitle class="white--text">
                  Menjadikan lembaga pendidikan yang berkualitas dan mandiri
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card height="250" color="indigo lighten-2">
                <v-card-title class="white--text">Misi Kami</v-card-title>
                <v-card-subtitle class="white--text">
                  Mendidik siswa agar:
                  <ol>
                    <li>Mengembangkan Potensi Dirinya</li>
                    <li>Berfikir Kreatif dan Kritis</li>
                    <li>Menguasai IFTEK</li>
                    <li>Membuka Lapangan Pekerejaan</li>
                    <li>
                      Menjadi Manusia yang Beriman dan Bertaqwa Kepada Tuhan
                      Yang Maha Esa
                    </li>
                  </ol>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
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
  name: "AboutView",
  setup() {},
  data() {
    return {
      items: [
        {
          src: require("@/assets/about/image1.jpg"),
        },
        {
          src: require("@/assets/about/image2.jpg"),
        },
        {
          src: require("@/assets/about/image3.jpg"),
        },
        {
          src: require("@/assets/about/image4.jpg"),
        },
      ],
    };
  },
};
</script>
