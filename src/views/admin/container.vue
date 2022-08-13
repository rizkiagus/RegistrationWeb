<template>
  <v-app>
    <sidebar />
    <router-view />
  </v-app>
</template>
<script>
import sidebar from "@/components/sidebar.vue";
export default {
  components: { sidebar },
  name: "ContainerView",
  setup() {},
};
</script>
