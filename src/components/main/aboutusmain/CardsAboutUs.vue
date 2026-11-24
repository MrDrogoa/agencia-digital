<script setup>
import { ref } from "vue";
import Card1 from "@/assets/card/cardaboutus/card-1.webp";
import Card2 from "@/assets/card/cardaboutus/card-2.webp";
import Card3 from "@/assets/card/cardaboutus/card-3.webp";
import { IconArrowUpRight } from "@tabler/icons-vue";

const cards = ref([
  {
    id: 1,
    image: Card1,
    title: "Creatividad\n& Estrategia",
    description:
      "Diseño con propósito comercial: construimos identidades visuales memorables que capturan leads y convierten visitas.",
  },
  {
    id: 2,
    image: Card2,
    title: "Accesibilidad\n& Cercanía",
    description:
      "Trato directo y transparente con Daniel y el equipo. Te explicamos cada etapa sin tecnicismos complejos.",
  },
  {
    id: 3,
    image: Card3,
    title: "Innovación\n& Calidad",
    description:
      "Código limpio, interfaces en Vue 3 y optimización Lighthouse para que tu web vuele en cualquier dispositivo.",
  },
]);

const openBooking = () => {
  window.open("/booking", "_blank");
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
    <div
      v-for="card in cards"
      :key="card.id"
      data-aos="fade-up"
      :data-aos-delay="card.id * 150"
      @click="openBooking"
      class="group relative w-full min-w-0 rounded-4xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <img
        :src="card.image"
        :alt="card.title.replace('\n', ' ')"
        class="w-full h-90 xl:h-100 object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div
        class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 transition-colors"
      ></div>

      <div
        class="absolute inset-0 z-10 flex flex-col justify-end p-5 lg:p-8 text-white"
      >
        <h3
          class="font-primary font-extrabold text-2xl lg:text-3xl xl:text-4xl mb-2 text-left"
          style="white-space: pre-line"
        >
          {{ card.title }}
        </h3>

        <p
          class="text-xs sm:text-sm text-gray-200 font-secondary leading-relaxed mb-4 text-left opacity-90 group-hover:opacity-100 transition-opacity"
        >
          {{ card.description }}
        </p>

        <div
          class="flex items-center gap-1.5 text-xs font-bold text-[#FFB446] group-hover:text-white transition-colors"
        >
          <span class="font-secondary">Agendar consulta sobre esto</span>
          <IconArrowUpRight class="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
</template>
