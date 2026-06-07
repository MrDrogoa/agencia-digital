<script setup>
import { ref } from "vue";
import img1 from "@/assets/card/cardworks/user1.svg";
import img2 from "@/assets/card/cardworks/user2.svg";
import img3 from "@/assets/card/cardworks/user3.svg";
import { IconArrowNarrowRightDashed } from "@tabler/icons-vue";

const cards = ref([
  {
    id: 1,
    icon: img1,
    title: "Mi web es lenta y no vende",
    description:
      "Optimizamos la carga y la estructura UX para convertir visitas en clientes reales.",
  },
  {
    id: 2,
    icon: img2,
    title: "No sé cómo empezar mi tienda",
    description:
      "Te guiamos desde el diseño en Figma hasta la configuración técnica y de pagos.",
  },
  {
    id: 3,
    icon: img3,
    title: "Necesito modernizar mi marca",
    description:
      "Refrescamos tu imagen visual para que conecte con tu audiencia actual y destaque.",
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
          class="w-16 h-16 rounded-full flex items-center justify-center absolute -top-10 left-8 shadow-xl"
        >
          <img :src="card.icon" alt="Icono" />
        </div>
        <!-- Contenido de la tarjeta -->
        <div class="py-6 lg:py-8 px-8 flex flex-col grow mt-4 lg:mt-5">
          <!-- Título -->
          <h3
            class="text-[#2E5A8F] text-xl md:text-2xl lg:text-3xl font-bold mb-5 md:mb-6 lg:mb-7 font-primary"
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
