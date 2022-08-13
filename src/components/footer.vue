<template>
  <v-footer padless color="indigo lighten-1" bottom>
    <v-container>
      <v-card flat tile class="indigo lighten-1">
        <div class="d-flex">
          <v-card-text class="white--text">
            <h3>Telepon</h3>
            <p class="caption mb-0">Telp. (061)7864701</p>
            <p class="caption mb-0">Fax: (061)7864702</p>
          </v-card-text>
          <v-card-text class="white--text">
            <h3>Media Sosial</h3>
            <v-btn v-for="icon in icons" :key="icon" class="white--text" icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text class="white--text">
            <h3>Alamat Sekolah</h3>
            JL. LINTAS MEDAN - KISARAN KM. 108, DESA TANAH TINGGI KEC. AIR PUTIH
            - KAB. BATU BARA
          </v-card-text>
        </div>

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          {{ new Date().getFullYear() }} — <strong>YAPIM Indrapura</strong>
        </v-card-text>
      </v-card>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  name: "FooterComponent",
  setup() {},
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
};
</script>
