<template>
  <v-navigation-drawer class="indigo lighten-5" permanent app>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-icon x-large> mdi-account-circle </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ datalogin.nama }}
          </v-list-item-title>
          <v-list-item-subtitle>TU YAPIM Indrapura</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>
    <v-list flat>
      <v-list-item-group color="indigo lighten-3" mandatory>
        <div v-for="(item, i) in items" :key="i">
          <v-list-item link :to="`/${item.value}`">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-item-group>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block class="text-capitalize third" depressed @click="logout">
          keluar
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import router from "@/router";
const cookie = require("tiny-cookie");
export default {
  name: "SidebarComponent",
  computed: {
    datalogin() {
      return this.$store.state.auth.datalogin;
    },
  },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", value: "dashboard" },
        { title: "Pendaftaran", icon: "mdi-list-box", value: "siswa" },
      ],
    };
  },
  methods: {
    logout() {
      cookie.remove("token");
      router.push("/login");
    },
  },
};
</script>
