<template>
  <v-app-bar color="indigo lighten-1" app>
    <v-container class="d-flex">
      <v-toolbar-title
        class="white--text mt-1 pointer"
        @click="() => this.$router.push('/')"
      >
        YAPIM Indrapura
      </v-toolbar-title>
      <v-list
        class="ms-3 pa-0 mt-0"
        flat
        dense
        nav
        tile
        color="indigo lighten-1"
      >
        <v-list-item-group mandatory class="d-flex">
          <!-- <v-item v-slot="{ active }"> -->
          <v-list-item
            class="pa-0 ma-0"
            v-for="(list, index) in navlist"
            :key="index"
          >
            <v-list-item-title
              class="mx-2 link white--text text-decoration-underline"
              v-text="list.judul"
              @click="goto('/' + list.to)"
            >
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-spacer></v-spacer>

      <v-btn plain class="text-capitalize" color="white" @click="go">
        <v-icon class="me-3 white--text">mdi-account</v-icon>
        Admin
      </v-btn>
    </v-container>
  </v-app-bar>
</template>
<script>
const cookie = require("tiny-cookie");
export default {
  name: "NavbarComponent",
  setup() {},
  data() {
    return {
      navlist: [
        {
          judul: "Formulir Pendaftaran",
          to: "pendaftaran",
        },
        {
          judul: "Tentang Kami",
          to: "about",
        },
      ],
    };
  },
  methods: {
    goto(link) {
      this.$router.push(link);
    },
    go() {
      if (cookie.get("token") != null) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
