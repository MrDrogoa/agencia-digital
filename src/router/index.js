import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutUsView from "@/views/AboutUsView.vue";
import WorksView from "@/views/WorksView.vue";
import ContactView from "@/views/ContactView.vue";
import SuccessView from "@/views/SuccessView.vue";
import BookingView from "@/views/BookingView.vue";
import QuoteView from "@/views/QuoteView.vue";
import PrivacyView from "@/views/PrivacyView.vue";
import SupportView from "@/views/SupportView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AdminView from "@/views/AdminView.vue";

// Definición de rutas con metadatos SEO completos
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "MisiDev - Agencia de Diseño & Desarrollo Web en Chile",
      description:
        "Creamos sitios web estratégicos, tiendas online y soluciones digitales a medida en Chile. Impulsa tu negocio con diseño moderno y tecnología de vanguardia.",
    },
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUsView,
    meta: {
      title: "Sobre Nosotros - MisiDev Agencia Digital",
      description:
        "Conoce al equipo detrás de MisiDev. Nuestra filosofía, valores y compromiso con el éxito y la transformación digital de nuestros clientes.",
    },
  },
  {
    path: "/works",
    name: "Works",
    component: WorksView,
    meta: {
      title: "Portafolio de Proyectos & Trabajos - MisiDev",
      description:
        "Explora nuestros casos de diseño UI/UX, desarrollo de aplicaciones y plataformas web exitosas creadas para empresas y emprendedores.",
    },
  },
  {
    path: "/success",
    name: "Success",
    component: SuccessView,
    meta: {
      title: "Casos de Éxito & Testimonios - MisiDev",
      description:
        "Resultados reales y testimonios de marcas que han transformado su presencia digital y multiplicado sus ventas con MisiDev.",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
    meta: {
      title: "Contacto Directo - MisiDev Agencia Digital",
      description:
        "¿Tienes una idea o proyecto en mente? Escríbenos directamente o visítanos en Santiago de Chile. Respuesta rápida garantizada.",
    },
  },
  {
    path: "/booking",
    name: "Booking",
    component: BookingView,
    meta: {
      title: "Agendar Reunión Estratégica Online - MisiDev",
      description:
        "Agenda una sesión de asesoría virtual con nuestro equipo de 10:00 a 19:00 hrs. Elige fecha y hora con confirmación y recordatorio automático.",
    },
  },
  {
    path: "/cotizador",
    name: "Quote",
    component: QuoteView,
    meta: {
      title: "Cotizador Interactivo de Presupuestos Web - MisiDev",
      description:
        "Calcula en tiempo real el valor estimado de tu proyecto web en Pesos Chilenos (CLP) o Dólares (USD). Transparente, instantáneo y sin compromiso.",
    },
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: PrivacyView,
    meta: {
      title: "Políticas de Privacidad & Protección de Datos - MisiDev",
      description:
        "Conoce cómo protegemos tus datos personales conforme a la legislación vigente y las mejores prácticas de privacidad y seguridad en internet.",
    },
  },
  {
    path: "/support",
    name: "Support",
    component: SupportView,
    meta: {
      title: "Centro de Soporte Técnico & FAQ - MisiDev",
      description:
        "Preguntas frecuentes, canales de ayuda, manuales y soporte prioritario para clientes de MisiDev Agencia Digital.",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    meta: {
      title: "Panel de Administración Seguro - MisiDev",
      description: "Acceso restringido para la administración de MisiDev.",
      robots: "noindex, nofollow", // Bloqueo estricto contra indexación
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: {
      title: "404 - Página no encontrada | MisiDev",
      description: "Lo sentimos, la página que buscas no existe o ha sido movida.",
      robots: "noindex, follow",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// Guard global para actualización dinámica de Meta Tags SEO
router.beforeEach((to, from, next) => {
  // 1. Título de la pestaña
  if (to.meta?.title) {
    document.title = to.meta.title;
  }

  // Helper para crear o actualizar etiquetas meta
  const setMetaTag = (selector, attribute, value) => {
    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement("meta");
      const [attrName, attrVal] = selector.replace(/[\[\]]/g, "").split("=");
      tag.setAttribute(attrName, attrVal.replace(/['"]/g, ""));
      document.head.appendChild(tag);
    }
    tag.setAttribute(attribute, value);
  };

  // 2. Meta Description
  if (to.meta?.description) {
    setMetaTag("meta[name='description']", "content", to.meta.description);
    setMetaTag("meta[property='og:description']", "content", to.meta.description);
    setMetaTag("meta[name='twitter:description']", "content", to.meta.description);
  }

  // 3. Open Graph Title
  if (to.meta?.title) {
    setMetaTag("meta[property='og:title']", "content", to.meta.title);
    setMetaTag("meta[name='twitter:title']", "content", to.meta.title);
  }

  // 4. Directiva de Robots (Crucial para proteger /admin)
  const robotsDirective = to.meta?.robots || "index, follow";
  setMetaTag("meta[name='robots']", "content", robotsDirective);

  next();
});

export default router;
