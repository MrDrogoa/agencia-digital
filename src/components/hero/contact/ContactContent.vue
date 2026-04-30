<script setup>
import TextH2PagesComponents from "@/components/font/TextH2PagesComponents.vue";
import "@/assets/css/hero/contactHero/contact.css";
</script>

<template>
  <div
    class="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 group"
  >
    <!-- Línea izquierda con gradiente -->
    <div
      class="relative h-0.5 md:h-1 w-8 sm:w-12 md:w-20 lg:w-32 overflow-hidden rounded-full bg-linear-to-r from-[#FF6D2A] to-[#FFB446]"
    >
      <div
        class="absolute inset-y-0 left-0 w-1/3 rounded-full bg-linear-to-r from-transparent via-white/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[loading_1.15s_linear_infinite]"
      ></div>
    </div>

    <!-- Texto Contact -->
    <text-h2-pages-components
      class="text-center whitespace-nowrap text-[#2E5A8F]"
    >
      Contacto
    </text-h2-pages-components>

    <!-- Línea derecha con gradiente inverso -->
    <div
      class="relative h-0.5 md:h-1 w-8 sm:w-12 md:w-20 lg:w-32 overflow-hidden rounded-full bg-linear-to-r from-[#FFB446] to-[#FF6D2A]"
    >
      <div
        class="absolute inset-y-0 left-0 w-1/3 rounded-full bg-linear-to-r from-transparent via-white/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[loading_1.15s_linear_infinite]"
      ></div>
    </div>
  </div>
</template>
