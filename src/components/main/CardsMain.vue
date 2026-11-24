<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Card1 from "@/assets/card/card-1.webp";
import Card2 from "@/assets/card/card-2.webp";
import Card3 from "@/assets/card/card-3.webp";
import {
  IconArrowNarrowRightDashed,
  IconUsersGroup,
  IconSourceCode,
  IconAutomaticGearboxFilled,
  IconCalendarPlus,
} from "@tabler/icons-vue";

const router = useRouter();

const openBooking = () => {
  window.open("/booking", "_blank");
};

const cards = ref([
  {
    id: 1,
    image: Card1,
    icon: IconUsersGroup,
    title: "Trabajo en Equipo",
    description:
      "Creemos que las mejores soluciones nacen de la inteligencia colectiva. Nos integramos en flujos de trabajo dinámicos, aportando una comunicación fluida y una coordinación técnica que garantiza la coherencia en cada etapa del proyecto.",
    linkText: "Ver Portafolio",
  },
  {
    id: 2,
    image: Card2,
    icon: IconSourceCode,
    title: "Desarrollo Web",
    description:
      "Construimos experiencias digitales escalables y de alto rendimiento. Nos especializamos en el uso de tecnologías modernas para entregar interfaces fluidas, asegurando que cada línea de código contribuya a una navegación intuitiva y optimizada para cualquier dispositivo.",
    linkText: "Ver Portafolio",
  },
  {
    id: 3,
    image: Card3,
    icon: IconAutomaticGearboxFilled,
    title: "Optimización Inteligente",
    description:
      "Implementamos herramientas de Inteligencia Artificial para optimizar procesos complejos y elevar la eficiencia operativa. Nos enfocamos en diseñar sistemas inteligentes y flujos automatizados que permitan a nuestros clientes escalar mediante el uso de tecnología de última generación.",
    linkText: "Ver Portafolio",
  },
]);
</script>

<template>
  <section>
    <div class="flex flex-col md:flex-row flex-wrap justify-center gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        data-aos="fade-up"
        :data-aos-delay="card.id * 150"
        class="group relative flex flex-col bg-white rounded-4xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] md:max-w-2xl lg:max-w-6xl mx-auto"
      >
        <!-- Imagen superior -->
        <div class="relative w-full h-48 overflow-hidden">
          <img
            :src="card.image"
            :alt="card.title"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Icono -->

        <div
          class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#2E5A8F] rounded-full flex items-center justify-center absolute top-40 left-8 shadow-lg"
        >
          <component :is="card.icon" class="text-white text-sm" />
        </div>
        <!-- Contenido de la tarjeta -->
        <div class="py-6 lg:py-8 px-8 flex flex-col grow mt-4 lg:mt-5">
          <!-- Título -->
          <h3
            class="text-[#2E5A8F] text-2xl md:text-3xl lg:text-4xl font-bold mb-5 md:mb-6 lg:mb-7 font-primary"
          >
            {{ card.title }}
          </h3>

          <!-- Descripción -->
          <p
            class="text-[#5C6F91] text-xs sm:text-sm lg:text-base leading-relaxed mb-4 md:mb-5 lg:mb-6 grow font-medium font-secondary"
          >
            {{ card.description }}
          </p>

          <!-- Acciones interactivas -->
          <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <router-link
              to="/works"
              class="inline-flex items-center text-xs sm:text-sm font-bold gap-1.5 text-[#2E5A8F] hover:text-[#FF762E] transition-colors font-secondary"
            >
              <span>{{ card.linkText }}</span>
              <IconArrowNarrowRightDashed
                class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </router-link>

            <button
              @click.stop="openBooking"
              class="text-xs font-bold text-[#FF6D2A] hover:text-[#FFB446] transition-colors cursor-pointer flex items-center gap-1"
            >
              <IconCalendarPlus class="w-3.5 h-3.5" />
              <span>Agendar</span>
            </button>
          </div>
        </div>

        <!-- Borde inferior en hover -->
        <div
          class="absolute bottom-0 left-0 right-0 h-1 bg-[#FF762E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
        ></div>
      </div>
    </div>
  </section>
</template>
