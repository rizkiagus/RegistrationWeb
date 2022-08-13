import Vue from "vue";
import VueRouter from "vue-router";
import LandingView from "../views/LandingView.vue";
import PendaftaranView from "../views/Pendaftaran.vue";
import LoginView from "../views/Login.vue";
import DashboardAdmin from "../views/admin/dashboard.vue";
import container from "../views/admin/container.vue";
import siswa from "../views/admin/siswa.vue";
import About from "../views/AboutView.vue";
import Pembayaran from "../views/pembayaran.vue";
import Success from "../views/successpage.vue";
import DetailSiswa from "../views/admin/detailsiswa.vue";

Vue.use(VueRouter);

const cookie = require("tiny-cookie");
const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingView,
  },
  {
    path: "/pendaftaran",
    name: "Pendaftaran",
    component: PendaftaranView,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/pembayaran",
    component: Pembayaran,
  },
  {
    path: "/sukses",
    component: Success,
  },
  {
    path: "/dashboard",
    component: container,
    beforeEnter: (to, from, next) => {
      if (cookie.get("token") === null || !cookie.get("token")) {
        return next("/login");
      }
      next();
    },
    children: [
      {
        path: "/",
        component: DashboardAdmin,
      },
      {
        path: "/siswa",
        component: siswa,
      },
      {
        path: "/siswa/detail/:id",
        component: DetailSiswa,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
