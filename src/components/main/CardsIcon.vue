<script setup>
import { IconCloudDown } from "@tabler/icons-vue";

// Props para recibir los datos de las cards
const props = defineProps({
  cards: {
    type: Array,
    default: () => [
      {
        id: 1,
        icon: IconCloudDown,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        id: 2,
        icon: IconCloudDown,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        id: 3,
        icon: IconCloudDown,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        id: 4,
        icon: IconCloudDown,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        id: 5,
        icon: IconCloudDown,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        id: 6,
        icon: IconCloudDown,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        id: 7,
        icon: IconCloudDown,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        id: 8,
        icon: IconCloudDown,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet.",
      },
    ],
  },
});
</script>

<template>
  <section class="w-full max-w-7xl mx-auto px-4">
    <!-- Contenedor flex con wrap -->
    <div
      class="flex flex-wrap justify-center align-content-start gap-4 md:gap-6 rounded-2xl"
    >
      <!-- Card individual -->
      <article
        v-for="card in cards"
        :key="card.id"
        class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-[#2E5A8F] rounded-2xl p-6"
      >
        <!-- Contenedor interior blanco con bordes redondeados -->
        <div
          class="bg-white rounded-2xl p-6 flex flex-col items-center text-center h-full"
        >
          <!-- Icono -->
          <div class="mb-4">
            <component
              :is="card.icon"
              class="w-16 h-16 text-[#2E5A8F]"
              stroke-width="1.5"
            />
          </div>

          <!-- Título -->
          <h3 class="text-xl font-bold text-[#2E5A8F] mb-2">
            {{ card.title }}
          </h3>

          <!-- Descripción -->
          <p class="text-sm text-[#5C6F91]">
            {{ card.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
