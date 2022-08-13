<template>
  <div class="mx-auto mt-12 text-center">
    <v-img :src="img" width="500"></v-img>
    Maaf, Fitur ini masih dalam pengembangan
  </div>
</template>
<script>
export default {
  name: "DashboardAdmin",
  setup() {},
  created() {
    document.title = "Dashboard Admin";
  },
  data() {
    return {
      img: require("@/assets/developo.jpg"),
    };
  },
};
</script>
