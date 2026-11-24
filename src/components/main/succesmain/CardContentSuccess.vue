<script setup>
import { ref } from "vue";
import ButtonSingleComponents from "@/components/buttons/ButtonSingleComponents.vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import {
  IconX,
  IconCheck,
  IconArrowUpRight,
  IconCalendarEvent,
  IconTrendingUp,
} from "@tabler/icons-vue";

// Nuevas imágenes diferenciadas para cada proyecto
import imgFerreteria from "@/assets/projects/ferreteria-central.webp";
import imgOdontosalud from "@/assets/projects/odontosalud.webp";
import imgSilva from "@/assets/projects/portafolio-silva.webp";
import imgQuickmove from "@/assets/projects/quickmove-logistica.webp";

const cards = ref([
  {
    id: 1,
    title: "E-commerce Ferretería Central",
    subtitle: "Catálogo interactivo & Tienda online",
    image: imgFerreteria,
    buttonText: "Ver Caso de Éxito",
    tag: "E-commerce / Retail",
    client: "Ferretería & Construcción Central (Santiago)",
    challenge:
      "Negocio tradicional con más de 1,200 productos físicos que dependía únicamente de ventas presenciales y consultas telefónicas desorganizadas.",
    solution:
      "Diseñamos y desarrollamos una plataforma e-commerce rápida con catálogo categorizado, buscador instantáneo y pasarela de pago Webpay/MercadoPago integrada.",
    results: [
      "+45% en consultas de compra locales durante el primer mes",
      "Reducción del 60% en tiempo de respuesta a clientes",
      "Catálogo accesible y autogestionable 24/7 en cualquier móvil",
    ],
    tech: ["Vue.js 3", "Tailwind CSS", "Node.js", "Webpay Plus"],
  },
  {
    id: 2,
    title: "Plataforma OdontoSalud",
    subtitle: "Sitio web corporativo & Citas online",
    image: imgOdontosalud,
    buttonText: "Ver Caso de Éxito",
    tag: "Salud & Servicios",
    client: "Clínica Dental OdontoSalud (Providencia)",
    challenge:
      "Página web anticuada sin versión móvil, tiempos de carga lentos y un sistema de reservas manual que saturaba la recepción.",
    solution:
      "Rediseño completo enfocado en UX médica: interfaz limpia, generación de confianza visual y sistema interactivo de agendamiento de horas.",
    results: [
      "Tiempo de carga reducido a menos de 1.1 segundos",
      "+70% de citas agendadas directamente desde smartphones",
      "Aumento significativo en valoraciones positivas de pacientes",
    ],
    tech: ["Vue 3", "Vite", "Node.js Express", "Google Calendar Sync"],
  },
  {
    id: 3,
    title: "Portafolio Creativo Silva",
    subtitle: "UI/UX de vanguardia & Alto rendimiento",
    image: imgSilva,
    buttonText: "Ver Caso de Éxito",
    tag: "Creativos & Branding",
    client: "Matías Silva — Fotógrafo & Director de Arte",
    challenge:
      "Necesitaba un portafolio de alto impacto visual para cerrar acuerdos con agencias y marcas internacionales sin sacrificar velocidad.",
    solution:
      "Diseño prototipado en Figma con microinteracciones sutiles, carga diferida de imágenes ultra HD y tipografía editorial de vanguardia.",
    results: [
      "Puntuación de 98/100 en Google Lighthouse Performance",
      "Cierre de 3 contratos comerciales internacionales en 60 días",
      "Experiencia visual inmersiva optimizada para retina display",
    ],
    tech: ["Figma UI/UX", "Vue 3", "Tailwind CSS", "WebP Optimization"],
  },
  {
    id: 4,
    title: "QuickMove Logística Tech",
    subtitle: "Landing de captación & Conversión",
    image: imgQuickmove,
    buttonText: "Ver Caso de Éxito",
    tag: "Startups & SaaS",
    client: "QuickMove Logistics SpA",
    challenge:
      "Lanzamiento de una nueva solución logística que requería captar conductores y clientes corporativos antes del despegue operativo.",
    solution:
      "Landing page de alta conversión con copy persuasivo basado en el estudio de mercado, formularios dinámicos y métricas de analítica en tiempo real.",
    results: [
      "+320 registros calificados durante la fase de prelanzamiento",
      "Tasa de conversión de visita a lead del 8.4%",
      "Diseño responsive impecable verificado en más de 20 dispositivos",
    ],
    tech: ["Vue 3", "Tailwind CSS", "Node.js API", "Analytics Tracking"],
  },
]);

// Modal interactivo para ver detalles del caso
const selectedCase = ref(null);

const openCaseModal = (card) => {
  selectedCase.value = card;
};

const closeCaseModal = () => {
  selectedCase.value = null;
};

const bookSimilarProject = (serviceName) => {
  closeCaseModal();
  window.open("/booking", "_blank");
};
</script>

<template>
  <div
    class="mx-auto mt-8 flex w-full max-w-6xl flex-wrap gap-5 px-4 md:gap-6 md:px-6"
  >
    <article
      v-for="card in cards"
      :key="card.id"
      data-aos="fade-up"
      :data-aos-delay="card.id * 120"
      class="w-full rounded-3xl bg-[#204A8A] p-4 md:w-[calc(50%-0.75rem)] shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
    >
      <div
        class="relative h-60 overflow-hidden rounded-2xl sm:h-72 group cursor-pointer"
        @click="openCaseModal(card)"
      >
        <img
          :src="card.image"
          :alt="card.title"
          class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div
          class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5"
        >
          <div class="flex items-center justify-between mb-1">
            <span
              class="text-xs font-semibold text-[#FFB446] uppercase tracking-wider"
            >
              {{ card.subtitle }}
            </span>
            <span
              class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm"
            >
              {{ card.tag }}
            </span>
          </div>

          <h3
            class="font-primary text-2xl lg:text-3xl font-extrabold leading-tight text-white mb-2"
          >
            {{ card.title }}
          </h3>

          <div class="inline-flex w-fit mt-1">
            <button
              @click.stop="openCaseModal(card)"
              class="inline-flex items-center gap-2 py-2 px-5 rounded-3xl font-secondary font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-md cursor-pointer"
            >
              <span>{{ card.buttonText }}</span>
              <IconArrowUpRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>

    <!-- MODAL DETALLE DE CASO DE ÉXITO -->
    <div
      v-if="selectedCase"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      @click.self="closeCaseModal"
    >
      <div
        class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-left border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
      >
        <!-- Encabezado con imagen -->
        <div class="relative h-60 w-full overflow-hidden rounded-t-3xl">
          <img
            :src="selectedCase.image"
            :alt="selectedCase.title"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"
          ></div>

          <button
            @click="closeCaseModal"
            class="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition"
            aria-label="Cerrar modal"
          >
            <IconX class="w-6 h-6" />
          </button>

          <div class="absolute bottom-4 left-6 right-6">
            <span
              class="text-xs font-bold px-3 py-1 rounded-full bg-[#FF6D2A] text-white"
            >
              {{ selectedCase.tag }}
            </span>
            <h2
              class="text-2xl md:text-3xl font-extrabold text-white mt-2 font-primary"
            >
              {{ selectedCase.title }}
            </h2>
            <p class="text-xs text-gray-200 font-secondary">
              {{ selectedCase.client }}
            </p>
          </div>
        </div>

        <!-- Contenido del modal -->
        <div class="p-6 md:p-8 space-y-6">
          <!-- Desafío & Solución -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h4
                class="text-xs font-bold text-[#FF6D2A] uppercase tracking-wider mb-1"
              >
                El Desafío
              </h4>
              <p
                class="text-xs sm:text-sm text-gray-700 leading-relaxed font-secondary"
              >
                {{ selectedCase.challenge }}
              </p>
            </div>
            <div
              class="bg-[#1D4580]/5 p-4 rounded-2xl border border-[#1D4580]/15"
            >
              <h4
                class="text-xs font-bold text-[#1D4580] uppercase tracking-wider mb-1"
              >
                Nuestra Solución
              </h4>
              <p
                class="text-xs sm:text-sm text-gray-700 leading-relaxed font-secondary"
              >
                {{ selectedCase.solution }}
              </p>
            </div>
          </div>

          <!-- Resultados clave -->
          <div>
            <h4
              class="text-sm font-bold text-[#1D4580] flex items-center gap-1.5 mb-3 font-primary"
            >
              <IconTrendingUp class="w-4 h-4 text-[#FF6D2A]" />
              <span>Resultados Tangibles Obtenidos</span>
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(res, idx) in selectedCase.results"
                :key="idx"
                class="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-secondary"
              >
                <div
                  class="p-0.5 rounded-full bg-emerald-100 text-emerald-600 mt-0.5 shrink-0"
                >
                  <IconCheck class="w-3.5 h-3.5" />
                </div>
                <span>{{ res }}</span>
              </li>
            </ul>
          </div>

          <!-- Tecnologías usadas -->
          <div>
            <h4
              class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
            >
              Tecnologías Implementadas
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="t in selectedCase.tech"
                :key="t"
                class="text-xs font-semibold px-3 py-1 rounded-xl bg-gray-100 text-gray-700"
              >
                {{ t }}
              </span>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div
            class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between"
          >
            <button
              @click="closeCaseModal"
              class="w-full sm:w-auto px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              Volver a Casos
            </button>
            <button
              @click="bookSimilarProject(selectedCase.title)"
              class="w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <IconCalendarEvent class="w-4 h-4" />
              <span>Agendar Proyecto Similar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
