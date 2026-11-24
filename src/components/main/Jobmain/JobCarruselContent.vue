<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import imgWebdev from "@/assets/projects/carousel-webdev.webp";
import imgUiux from "@/assets/projects/carousel-uiux.webp";
import imgEcommerce from "@/assets/projects/carousel-ecommerce.webp";
import {
  IconArrowBigRightFilled,
  IconArrowBigLeftFilled,
  IconCalendarEvent,
  IconCheck,
} from "@tabler/icons-vue";

const slides = ref([
  {
    id: 1,
    title: "Desarrollo Web & Plataformas a Medida",
    subtitle: "Frontend Rápido & Arquitectura Escalable",
    description:
      "Construimos sitios web y aplicaciones a la medida de tus procesos de negocio. Usamos Vue.js, Tailwind CSS y Node.js para garantizar interfaces instantáneas, seguras y preparadas para escalar con tu crecimiento.",
    bullets: [
      "Tiempos de carga menores a 1.2 segundos",
      "Código limpio y optimizado para SEO técnico",
      "Totalmente responsivo en smartphones y tablets",
    ],
    image: imgWebdev,
    alt: "Desarrollo Web MisiDev",
    buttonText: "Agendar Proyecto a Medida",
    serviceName: "Desarrollo Web a Medida",
  },
  {
    id: 2,
    title: "Diseño UI/UX y Prototipado en Figma",
    subtitle: "Interfaces Centradas en el Usuario Real",
    description:
      "Transformamos ideas abstractas en flujos de navegación interactivos y atractivos. Prototipamos cada pantalla en Figma antes de escribir una sola línea de código, garantizando que cada botón e interacción tenga un propósito comercial claro.",
    bullets: [
      "Wireframes y mapas de navegación claros",
      "Sistemas de diseño reutilizables y coherentes",
      "Validación de usabilidad antes del desarrollo",
    ],
    image: imgUiux,
    alt: "Diseño UX UI en Figma MisiDev",
    buttonText: "Cotizar Diseño UI/UX",
    serviceName: "Diseño UX/UI Profesional",
  },
  {
    id: 3,
    title: "E-commerce & Tiendas de Alta Conversión",
    subtitle: "Vende tus Productos y Servicios 24/7",
    description:
      "Llevamos tiendas físicas y negocios tradicionales al comercio digital. Desarrollamos catálogos interactivos, carritos de compra fluidos y pasarelas de pago seguras que inspiran confianza en tus compradores.",
    bullets: [
      "Integración directa de pasarelas de pago seguras",
      "Panel autogestionable de productos y pedidos",
      "Diseño enfocado en maximizar tu ticket de venta",
    ],
    image: imgEcommerce,
    alt: "Tiendas Online E-commerce MisiDev",
    buttonText: "Agendar Asesoría E-commerce",
    serviceName: "E-commerce y Ventas",
  },
]);

const currentIndex = ref(0);
let autoPlayInterval = null;

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  }, 6000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const restartAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  restartAutoPlay();
};

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? slides.value.length - 1 : currentIndex.value - 1;
  restartAutoPlay();
};

const goToSlide = (idx) => {
  currentIndex.value = idx;
  restartAutoPlay();
};

const handleSlideAction = (serviceName) => {
  window.open("/booking", "_blank");
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <section class="w-full max-w-6xl mx-auto px-4 md:px-6">
    <div
      class="flex flex-col items-center"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <!-- Slide Container con transición -->
      <transition
        mode="out-in"
        enter-active-class="transition-all duration-500 ease-in-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in-out"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          :key="slides[currentIndex].id"
          class="w-full bg-[#1D4580] rounded-4xl p-6 md:p-8 lg:p-10 shadow-2xl text-white flex flex-col lg:flex-row gap-8 items-center"
        >
          <!-- Imagen del slide -->
          <div class="w-full lg:w-1/2 overflow-hidden rounded-3xl shadow-xl relative group">
            <img
              :src="slides[currentIndex].image"
              :alt="slides[currentIndex].alt"
              class="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-[#FF6D2A] text-white">
                MisiDev Showcase
              </span>
            </div>
          </div>

          <!-- Contenido textual del slide -->
          <div class="w-full lg:w-1/2 flex flex-col justify-between text-left">
            <div>
              <span class="text-xs sm:text-sm font-semibold text-[#FFB446] uppercase tracking-wider block mb-1">
                {{ slides[currentIndex].subtitle }}
              </span>
              <h3 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-primary mb-4 leading-tight">
                {{ slides[currentIndex].title }}
              </h3>
              <p class="text-sm sm:text-base text-gray-200 font-secondary leading-relaxed mb-5">
                {{ slides[currentIndex].description }}
              </p>

              <!-- Bullets de beneficios -->
              <ul class="space-y-2 mb-6">
                <li
                  v-for="(bullet, bIdx) in slides[currentIndex].bullets"
                  :key="bIdx"
                  class="flex items-center gap-2 text-xs sm:text-sm text-gray-200"
                >
                  <div class="p-1 rounded-full bg-[#FF6D2A] text-white shrink-0">
                    <IconCheck class="w-3 h-3" />
                  </div>
                  <span>{{ bullet }}</span>
                </li>
              </ul>
            </div>

            <!-- Botón de acción interactivo -->
            <div>
              <button
                @click="handleSlideAction(slides[currentIndex].serviceName)"
                class="w-full sm:w-auto px-6 py-3.5 rounded-3xl font-secondary font-bold text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <IconCalendarEvent class="w-4 h-4" />
                <span>{{ slides[currentIndex].buttonText }}</span>
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Controles de navegación y puntos indicadores -->
      <div class="flex items-center justify-between w-full max-w-sm mt-6">
        <button
          @click="prevSlide"
          class="w-11 h-11 rounded-full bg-[#1D4580] hover:bg-[#FF6D2A] cursor-pointer flex items-center justify-center transition-all duration-300 shadow-md active:scale-90"
          aria-label="Slide anterior"
        >
          <IconArrowBigLeftFilled class="w-5 h-5 text-white" />
        </button>

        <!-- Indicadores (dots) -->
        <div class="flex gap-2">
          <button
            v-for="(s, sIdx) in slides"
            :key="s.id"
            @click="goToSlide(sIdx)"
            :class="[
              'h-3 rounded-full transition-all duration-300 cursor-pointer',
              currentIndex === sIdx ? 'w-8 bg-[#FF6D2A]' : 'w-3 bg-gray-300 hover:bg-gray-400'
            ]"
            :aria-label="`Ir al slide ${sIdx + 1}`"
          ></button>
        </div>

        <button
          @click="nextSlide"
          class="w-11 h-11 rounded-full bg-[#1D4580] hover:bg-[#FF6D2A] cursor-pointer flex items-center justify-center transition-all duration-300 shadow-md active:scale-90"
          aria-label="Siguiente slide"
        >
          <IconArrowBigRightFilled class="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  </section>
</template>
