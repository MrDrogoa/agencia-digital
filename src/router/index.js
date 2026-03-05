import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutUsView from "@/views/AboutUsView.vue";
import WorksView from "@/views/WorksView.vue";
import ContactView from "@/views/ContactView.vue";
import SuccessView from "@/views/SuccessView.vue";

// Definición de rutas
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Inicio - Agencia digital",
    },
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUsView,
    meta: {
      title: "Nosotros - Agencia digital",
    },
  },
  {
    path: "/works",
    name: "Works",
    component: WorksView,
    meta: {
      title: "Trabajos - Agencia digital",
    },
  },
  {
    path: "/success",
    name: "Success",
    component: SuccessView,
    meta: {
      title: "Exitos - Agencia digital",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
    meta: {
      title: "Contacto - Agencia digital",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
