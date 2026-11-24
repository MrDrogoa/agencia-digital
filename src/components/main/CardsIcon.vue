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
import { useRouter } from "vue-router";

const router = useRouter();

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
          "Creamos sitios rápidos y escalables con Vue.js, React y Node.js adaptados exactamente a tus necesidades técnicas.",
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
          "Llevamos tu negocio tradicional al mundo digital, simplificando procesos y conectando con nuevos clientes.",
      },
      {
        id: 7,
        icon: IconDiamondFilled,
        title: "Branding & Identidad",
        description:
          "Diseñamos la identidad visual de tu marca o proyectos para resaltar su valor, autenticidad y profesionalismo.",
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
        data-aos="fade-up"
        :data-aos-delay="(card.id % 4) * 120"
        class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-[#2E5A8F] rounded-2xl p-6 group cursor-pointer relative overflow-hidden"
      >
        <!-- Contenedor interior blanco con bordes redondeados -->
        <router-link to="/booking">
          <div
            class="bg-white rounded-2xl p-6 flex flex-col items-center text-center h-full transition-all duration-500 ease-in-out group-hover:scale-105"
          >
            <!-- Icono -->
            <div class="mb-4 relative">
              <component
                :is="card.icon"
                class="w-16 h-16 text-[#FF6D2A]"
                stroke-width="1.5"
              />
            </div>

            <!-- Título -->
            <h3 class="text-xl font-bold text-[#2E5A8F] mb-2 font-primary">
              {{ card.title }}
            </h3>

            <!-- Descripción -->
            <p
              class="text-sm text-[#5C6F91] font-secondary leading-relaxed mb-4"
            >
              {{ card.description }}
            </p>
          </div>
        </router-link>
      </article>
    </div>
  </section>
</template>
