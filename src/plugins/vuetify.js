import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        second: "#2a3158",
        third: "#b4bbe2",
        four: "#dcdcdc",
      },
    },
  },
});
