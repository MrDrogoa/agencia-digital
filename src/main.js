import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// Librería de animaciones AOS (Animate On Scroll)
import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);
app.use(router);
app.mount("#app");

// Inicializar animaciones fluidas y reactivas
AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: false, // Las animaciones reactivan al scroll para que el sitio se sienta vivo
  offset: 50,
  delay: 50,
});

// En cada cambio de página, desplazar al inicio suavemente y refrescar animaciones
router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    AOS.refresh();
  }, 120);
});
