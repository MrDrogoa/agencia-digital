<script setup>
import { ref } from "vue";
import Card1 from "@/assets/card/card-1.webp";
import Card2 from "@/assets/card/card-2.webp";
import Card3 from "@/assets/card/card-3.webp";
import { IconArrowNarrowRightDashed } from "@tabler/icons-vue";

const cards = ref([
  {
    id: 1,
    icon: "", // Aquí pondrás la ruta de tu icono
    title: "Titulo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem non felis dignissim vestibulum at et lorem.",
  },
  {
    id: 2,
    icon: "", // Aquí pondrás la ruta de tu icono
    title: "Titulo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem non felis dignissim vestibulum at et lorem.",
  },
  {
    id: 3,
    icon: "", // Aquí pondrás la ruta de tu icono
    title: "Titulo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem non felis dignissim vestibulum at et lorem.",
  },
]);
</script>

<template>
  <section>
    <div class="flex flex-col md:flex-row flex-wrap justify-center gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="group relative flex flex-col bg-white rounded-4xl shadow-lg transition-all duration-300 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] md:max-w-2xl lg:max-w-6xl mx-auto"
      >
        <!-- Icono -->

        <div
          class="w-16 h-16 bg-[#2E5A8F] rounded-full flex items-center justify-center absolute -top-10 left-8 shadow-lg"
        >
          <span class="text-white text-sm">icon</span>
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
        </div>
      </div>
    </div>
  </section>
</template>
