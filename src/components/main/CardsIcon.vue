<script setup>
import {
  IconCodeCircle2Filled,
  IconShoppingCartFilled,
  IconPaintFilled,
  IconSettingsFilled,
  IconSortAscending2Filled,
  IconArrowAutofitUpFilled,
  IconDiamondFilled,
  IconShieldCheckFilled,
} from "@tabler/icons-vue";

// Props para recibir los datos de las cards
const props = defineProps({
  cards: {
    type: Array,
    default: () => [
      {
        id: 1,
        icon: IconCodeCircle2Filled,
        title: "Desarrollo Web a Medida",
        description:
          "Medida	Creamos sitios rápidos y escalables con React, Vue.js y Node.js adaptados a tus necesidades técnicas.",
      },
      {
        id: 2,
        icon: IconShoppingCartFilled,
        title: "E-commerce y Ventas",
        description:
          "Implementamos tiendas online con pasarelas de pago seguras para que vendas tus productos 24/7.",
      },
      {
        id: 3,
        icon: IconPaintFilled,
        title: "Diseño UX/UI Profesional",
        description:
          "Prototipamos interfaces intuitivas en Figma que garantizan una experiencia de usuario fluida y moderna.",
      },
      {
        id: 4,
        icon: IconSettingsFilled,
        title: "Soluciones en WordPress",
        description:
          "Sitios autogestionables y potentes con PHP, ideales para emprendedores que buscan autonomía.",
      },
      {
        id: 5,
        icon: IconSortAscending2Filled,
        title: "SEO y Visibilidad",
        description:
          "Optimizamos tu estructura web para que tiendas y negocios tradicionales aparezcan en los primeros resultados.",
      },
      {
        id: 6,
        icon: IconArrowAutofitUpFilled,
        title: "Digitalización de Negocios",
        description:
          "Negocios	Llevamos tu negocio tradicional al mundo digital, simplificando procesos y conectando con nuevos clientes.",
      },
      {
        id: 7,
        icon: IconDiamondFilled,
        title: "Branding para Artesanos",
        description:
          "Diseñamos la identidad visual de tus productos hechos a mano para resaltar su valor y autenticidad.",
      },
      {
        id: 8,
        icon: IconShieldCheckFilled,
        title: "Mantenimiento Técnico",
        description:
          "Soporte continuo y actualizaciones constantes para que tu plataforma web esté siempre segura y operativa.",
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
