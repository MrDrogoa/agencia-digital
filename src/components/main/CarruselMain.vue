<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import VectorCarrusel from "@/assets/carrusel/VectorCarrusel.svg";
import software from "@/assets/carrusel/software.webp";
import business from "@/assets/carrusel/business.webp";
import draw from "@/assets/carrusel/draw.webp";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import {
  IconArrowBigRightFilled,
  IconArrowBigLeftFilled,
} from "@tabler/icons-vue";

// Array de slides del carrusel
const slides = ref([
  {
    id: 1,
    image: software,
    title: "Te guiamos en el camino de la innovación",
    description:
      "Transformamos líneas de código en soluciones estratégicas. Nuestro enfoque combina robustez técnica con un diseño centrado en el usuario para impulsar la competitividad de tu negocio.",
    link: "/servicios/desarrollo-software",
  },
  {
    id: 2,
    image: draw,
    title: "Diseño que impacta, Estrategia que convierte",
    description:
      "No solo creamos flyers; diseñamos identidades visuales que cuentan historias. Potenciamos tu presencia online con estética estratégica para destacar desde el primer clic.",
    link: "/servicios/diseño",
  },
  {
    id: 3,
    image: business,
    title: "Garantizamos el éxito de tu visión digital",
    description:
      "Trabajar con nosotros es iniciar una alianza de crecimiento. Nos comprometemos con la accesibilidad, la transparencia y resultados tangibles que construyen confianza a largo plazo.",

    link: "/servicios/marketing-digital",
  },
]);

// Estado del carrusel
const currentIndex = ref(0);
let autoPlayInterval = null;

// Función para ir al siguiente slide
const nextSlide = () => {
  stopAutoPlay();
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

// Función para ir al slide anterior
const prevSlide = () => {
  stopAutoPlay();
  currentIndex.value =
    currentIndex.value === 0 ? slides.value.length - 1 : currentIndex.value - 1;
};

// Función para ir a un slide específico
const goToSlide = (index) => {
  stopAutoPlay();
  currentIndex.value = index;
};

// Función para detener el auto-play
const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

// Función para iniciar el auto-play
const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  }, 5000); // Cambia cada 5 segundos
};

// Lifecycle hooks
onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <section class="relative w-full max-w-7xl mx-auto">
    <!-- Contenedor del carrusel con fondo (solo visible en lg+) -->
    <div class="relative rounded-2xl">
      <!-- Vector de fondo (solo visible en lg+) -->
      <div class="hidden lg:block absolute inset-0 -z-10 rounded-2xl">
        <img
          :src="VectorCarrusel"
          alt="Vector Carrusel"
          class="w-full h-full"
        />
      </div>

      <!-- Slides del carrusel -->
      <div class="relative lg:px-8 py-8 lg:py-12">
        <div class="relative inset-0 lg:min-h-100 lg:flex lg:items-center">
          <!-- Cada slide -->
          <transition name="fade" mode="out-in">
            <div
              :key="slides[currentIndex].id"
              class="flex flex-col lg:flex-row items-center gap-3 md:gap-4 lg:gap-5 w-full"
            >
              <!-- Imagen -->
              <div class="w-full lg:w-1/2 shrink-0">
                <img
                  :src="slides[currentIndex].image"
                  :alt="slides[currentIndex].title"
                  class="w-full md:w-100 lg:w-130 m-auto object-cover rounded-2xl shadow-xl"
                />
              </div>

              <!-- Contenido de texto -->
              <div
                class="w-full lg:w-1/2 text-center lg:text-left px-4 lg:px-0"
              >
                <button-all-components
                  :link="slides[currentIndex].link"
                  class="mb-2 md:mb-4"
                >
                  Get Started
                </button-all-components>
                <h2
                  class="text-3xl lg:text-4xl font-bold text-[#2E5A8F] lg:text-white mb-4 lg:mb-6"
                >
                  {{ slides[currentIndex].title }}
                </h2>
                <p
                  class="text-base lg:text-lg text-[#5C6F91] lg:text-white leading-relaxed"
                >
                  {{ slides[currentIndex].description }}
                </p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- Indicadores (dots) -->
    <div class="flex gap-2 justify-center">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="goToSlide(index)"
        :class="[
          'w-3 h-3 rounded-full transition-all border-2 border-[#2E5A8F]',
          index === currentIndex
            ? 'bg-[#2E5A8F] '
            : 'bg-white/50 hover:bg-white/70',
        ]"
        :aria-label="`Ir al slide ${index + 1}`"
      ></button>
    </div>

    <!-- Controles del carrusel -->
    <div class="flex items-center justify-center gap-4 mt-6 lg:mt-8">
      <!-- Botón anterior -->
      <button
        @click="prevSlide"
        class="w-12 h-12 rounded-full bg-[#9FE7F5] cursor-pointer lg:hover:bg-[#2E5A8F] flex items-center justify-center transition-colors"
        aria-label="Slide anterior"
      >
        <icon-arrow-big-left-filled class="w-6 h-6 text-white" />
      </button>

      <!-- Botón siguiente -->
      <button
        @click="nextSlide"
        class="w-12 h-12 rounded-full bg-[#9FE7F5] cursor-pointer lg:hover:bg-[#2E5A8F] flex items-center justify-center transition-colors"
        aria-label="Siguiente slide"
      >
        <icon-arrow-big-right-filled class="w-7 h-7 text-white" />
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Transición fade para los slides */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
