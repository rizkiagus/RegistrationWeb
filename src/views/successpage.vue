<template>
  <div>
    <v-container class="mx-auto mt-12 text-center">
      <v-img
        :src="url"
        width="200"
        height="200"
        class="mx-auto my-auto"
      ></v-img>
      <h3 class="second--text">Berhasil Melakukan Pembayaran</h3>
      <h5 class="second--text">
        Anda sudah mendaftar di sekolah YAPIM Indrapura.
      </h5>
      <p class="second--text">
        Silahkan datang ke sekolah untuk melakukan pendaftaran ulang
      </p>
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-container>
  </div>
</template>
<script>
import router from "@/router";
export default {
  name: "SuccessView",
  setup() {},
  data() {
    return {
      url: require("@/assets/check.png"),
    };
  },
  methods: {
    loading() {
      setTimeout(() => router.push("/"), 3000);
    },
  },
  mounted() {
    this.loading();
  },
};
</script>
