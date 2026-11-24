<script setup>
import { ref } from "vue";
import img1 from "@/assets/card/cardworks/user1.svg";
import img2 from "@/assets/card/cardworks/user2.svg";
import img3 from "@/assets/card/cardworks/user3.svg";
import { IconArrowNarrowRightDashed, IconCalendarEvent } from "@tabler/icons-vue";

const cards = ref([
  {
    id: 1,
    icon: img1,
    title: "Mi web es lenta y no vende",
    description:
      "Optimizamos la carga y la estructura UX para convertir visitas en clientes reales.",
    action: "Auditar y Optimizar Mi Web",
  },
  {
    id: 2,
    icon: img2,
    title: "No sé cómo empezar mi tienda",
    description:
      "Te guiamos desde el diseño en Figma hasta la configuración técnica y de pagos.",
    action: "Planificar Mi Tienda Online",
  },
  {
    id: 3,
    icon: img3,
    title: "Necesito modernizar mi marca",
    description:
      "Refrescamos tu imagen visual para que conecte con tu audiencia actual y destaque.",
    action: "Modernizar Mi Imagen",
  },
]);

const openBooking = (actionName) => {
  window.open("/booking", "_blank");
};
</script>

<template>
  <section>
    <div class="flex flex-col md:flex-row flex-wrap justify-center gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="group relative flex flex-col bg-white rounded-4xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] md:max-w-2xl lg:max-w-6xl mx-auto"
      >
        <!-- Icono -->
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center absolute -top-10 left-8 shadow-xl bg-white"
        >
          <img :src="card.icon" alt="Icono" />
        </div>

        <!-- Contenido de la tarjeta -->
        <div class="py-6 lg:py-8 px-8 flex flex-col grow mt-4 lg:mt-5 justify-between">
          <div>
            <!-- Título -->
            <h3
              class="text-[#2E5A8F] text-xl md:text-2xl lg:text-3xl font-bold mb-4 font-primary"
            >
              {{ card.title }}
            </h3>

            <!-- Descripción -->
            <p
              class="text-[#5C6F91] text-xs sm:text-sm lg:text-base leading-relaxed mb-6 font-medium font-secondary"
            >
              {{ card.description }}
            </p>
          </div>

          <!-- Botón de acción interactivo -->
          <div class="pt-4 border-t border-gray-100">
            <button
              @click="openBooking(card.action)"
              class="w-full py-2.5 px-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <IconCalendarEvent class="w-4 h-4" />
              <span>{{ card.action }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
