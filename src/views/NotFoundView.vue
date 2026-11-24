<script setup>
import { useRouter } from "vue-router";
import {
  IconHome,
  IconCalendarEvent,
  IconSearch,
  IconBriefcase,
  IconHelpCircle,
  IconArrowRight,
} from "@tabler/icons-vue";

const router = useRouter();

const goHome = () => {
  router.push("/");
};

const openBooking = () => {
  window.open("/booking", "_blank");
};

const quickLinks = [
  {
    title: "Portafolio de Trabajos",
    desc: "Explora los sitios web y tiendas que hemos creado.",
    to: "/works",
    icon: IconBriefcase,
  },
  {
    title: "Casos de Éxito",
    desc: "Revisa resultados y testimonios de clientes reales.",
    to: "/success",
    icon: IconSearch,
  },
  {
    title: "Centro de Soporte",
    desc: "¿Tienes dudas? Visita nuestras preguntas frecuentes.",
    to: "/support",
    icon: IconHelpCircle,
  },
];
</script>

<template>
  <section class="max-w-5xl mx-auto px-4 py-12 md:py-20 text-center">
    <!-- Contenedor 404 principal -->
    <div
      data-aos="zoom-in"
      data-aos-duration="800"
      class="bg-gradient-to-b from-[#1D4580] to-[#063F5C] rounded-4xl p-8 sm:p-12 md:p-16 text-white shadow-2xl relative overflow-hidden"
    >
      <!-- Decoración de fondo sutil -->
      <div class="absolute -top-24 -right-24 w-72 h-72 bg-[#FF6D2A]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-72 h-72 bg-[#9FE7F5]/15 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold text-[#FFB446] mb-6">
        <span class="w-2 h-2 rounded-full bg-[#FF6D2A] animate-ping"></span>
        Código de Error 404
      </div>

      <!-- Número gigante estilizado -->
      <h1 class="text-7xl sm:text-8xl md:text-9xl font-black font-primary tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#9FE7F5] to-white/70 mb-4 animate-float-subtle">
        404
      </h1>

      <!-- Título & Subtítulo -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold font-primary mb-4 text-white">
        ¡Ups! Parece que esta página se perdió en el código
      </h2>
      <p class="text-sm sm:text-base md:text-lg text-gray-200 font-secondary max-w-2xl mx-auto leading-relaxed mb-8">
        La dirección que ingresaste no existe o fue trasladada. Pero no te preocupes, en MisiDev siempre encontramos el camino correcto para tu proyecto.
      </p>

      <!-- Botones de Acción -->
      <div class="flex flex-wrap items-center justify-center gap-4">
        <button
          @click="goHome"
          class="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer flex items-center gap-2"
        >
          <IconHome class="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <button
          @click="openBooking"
          class="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-[#1D4580] bg-white hover:bg-gray-100 active:scale-95 transition shadow-md cursor-pointer flex items-center gap-2"
        >
          <IconCalendarEvent class="w-4 h-4 text-[#FF6D2A]" />
          <span>Agendar una Cita</span>
        </button>
      </div>
    </div>

    <!-- Enlaces rápidos de recuperación -->
    <div
      data-aos="fade-up"
      data-aos-delay="200"
      class="mt-12 text-left"
    >
      <h3 class="text-lg md:text-xl font-bold font-primary text-[#1D4580] text-center mb-6">
        Quizás estabas buscando alguna de estas secciones:
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <router-link
          v-for="(item, idx) in quickLinks"
          :key="idx"
          :to="item.to"
          class="p-6 rounded-3xl bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div class="w-12 h-12 rounded-2xl bg-[#1D4580]/5 text-[#1D4580] group-hover:bg-[#FF6D2A] group-hover:text-white flex items-center justify-center transition-colors mb-4">
              <component :is="item.icon" class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-base md:text-lg text-[#1D4580] group-hover:text-[#FF6D2A] transition-colors font-primary mb-1">
              {{ item.title }}
            </h4>
            <p class="text-xs sm:text-sm text-gray-500 font-secondary leading-relaxed">
              {{ item.desc }}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-50 flex items-center gap-1 text-xs font-bold text-[#FF6D2A] group-hover:underline">
            <span>Explorar</span>
            <IconArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>
