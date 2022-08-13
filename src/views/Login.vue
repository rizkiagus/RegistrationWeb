<template>
  <div>
    <navbar />
    <div class="main my-auto mx-auto text-center pt-5">
      <v-container>
        <h3 class="second--text">Selamat Datang Kembali</h3>
        <h5 class="font-weight-thin second--text">
          Silahkan masukan akun anda dengan benar!
        </h5>
        <v-form class="my-5" @submit.prevent="login">
          <v-row>
            <v-col cols="4"> </v-col>
            <v-col cols="4">
              <v-text-field
                label="Username"
                outlined
                dense
                v-model="user.username"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Password"
                outlined
                dense
                :append-icon="password ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="password = !password"
                :type="password ? 'text' : 'password'"
              ></v-text-field>
              <h4 class="red white--text my-3" v-show="error">
                Username/Password Salah!
              </h4>
              <h4 class="indigo white--text my-3" v-show="success">
                Berhasil Masuk!
              </h4>
              <v-btn
                class="text-capitalize white--text"
                width="100%"
                depressed
                :loading="loading"
                color="indigo lighten-2"
                type="submit"
              >
                Masuk
              </v-btn>
            </v-col>
            <v-col cols="4"></v-col>
          </v-row>
        </v-form>
      </v-container>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar.vue";
export default {
  name: "LoginView",
  components: { Navbar },
  setup() {},
  data() {
    return {
      error: false,
      success: false,
      password: false,
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.auth.isLoading;
    },
    code() {
      return this.$store.state.auth.message;
    },
  },
  created() {
    document.title = "Admin Login";
  },
  methods: {
    async login() {
      this.error = false;
      await this.$store.dispatch("auth/login", this.user);
      if (this.code === 400 && this.loading == false) {
        this.error = true;
      } else {
        this.error = false;
        this.success = true;
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>
