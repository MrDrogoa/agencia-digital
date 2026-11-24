<script setup>
import { ref, computed } from "vue";
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";
import { IconStarFilled, IconQuote, IconFilter } from "@tabler/icons-vue";

// 8 Avatares distintos y personalizados
import avatarCarlos from "@/assets/avatars/avatar-carlos.webp";
import avatarAndrea from "@/assets/avatars/avatar-andrea.webp";
import avatarMatias from "@/assets/avatars/avatar-matias.webp";
import avatarPaula from "@/assets/avatars/avatar-paula.webp";
import avatarRodrigo from "@/assets/avatars/avatar-rodrigo.webp";
import avatarCamila from "@/assets/avatars/avatar-camila.webp";
import avatarFelipe from "@/assets/avatars/avatar-felipe.webp";
import avatarSofia from "@/assets/avatars/avatar-sofia.webp";

const allComments = [
  {
    id: 1,
    name: "Carlos Muñoz",
    role: "Ferretería & Construcción Central",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    comment:
      "Digitalizar nuestro catálogo con MisiDev aumentó las consultas locales en un 45%. La navegación es intuitiva y nuestros clientes encuentran todo al instante.",
    img: avatarCarlos,
    stars: 5,
  },
  {
    id: 2,
    name: "Andrea Valenzuela",
    role: "Fundadora de Terra Gourmet",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    comment:
      "Buscábamos una tienda en línea desde cero que reflejara la calidad de nuestros productos. MisiDev captó nuestra esencia desde el primer prototipo en Figma.",
    img: avatarAndrea,
    stars: 5,
  },
  {
    id: 3,
    name: "Matías Silva",
    role: "Fotógrafo & Director Creativo",
    category: "creative",
    categoryLabel: "Creativos & Diseño",
    comment:
      "Mi portafolio anterior era lento y genérico. Con MisiDev logramos una web ultra rápida, moderna y con una estética que me ayuda a cerrar clientes corporativos.",
    img: avatarMatias,
    stars: 5,
  },
  {
    id: 4,
    name: "Dra. Paula Herrera",
    role: "Directora en OdontoSalud",
    category: "services",
    categoryLabel: "Salud & Servicios",
    comment:
      "El sistema de agendamiento de citas y la claridad visual generaron muchísima confianza en nuestros pacientes. Excelente atención y soporte cercano.",
    img: avatarPaula,
    stars: 5,
  },
  {
    id: 5,
    name: "Rodrigo Peña",
    role: "Estudio Jurídico Peña & Asoc.",
    category: "services",
    categoryLabel: "Salud & Servicios",
    comment:
      "Queríamos proyectar máxima seriedad y transparencia. La web desarrollada por MisiDev nos posicionó con autoridad en Google para nuestro nicho legal.",
    img: avatarRodrigo,
    stars: 5,
  },
  {
    id: 6,
    name: "Camila Rivas",
    role: "Diseñadora de Interiores",
    category: "creative",
    categoryLabel: "Creativos & Diseño",
    comment:
      "Trabajar con un equipo que comprende Figma al detalle fue una maravilla. El sitio web quedó idéntico a lo planificado y responde perfecto en smartphones.",
    img: avatarCamila,
    stars: 5,
  },
  {
    id: 7,
    name: "Felipe Morales",
    role: "Co-Founder en QuickMove Tech",
    category: "startups",
    categoryLabel: "Startups & SaaS",
    comment:
      "Nos ayudaron a lanzar la landing de captación para nuestra app logística en tiempo récord. Código limpio, tiempos de carga excelentes y gran predisposición.",
    img: avatarFelipe,
    stars: 5,
  },
  {
    id: 8,
    name: "Sofía Castro",
    role: "Café & Tostaduría Nativa",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    comment:
      "Nos guiaron con paciencia en cada paso. Hoy recibimos pedidos online todos los días y los clientes elogian lo fácil y agradable que es nuestra plataforma.",
    img: avatarSofia,
    stars: 5,
  },
];

const selectedCategory = ref("all");

const categories = [
  { id: "all", label: "Todos los Testimonios" },
  { id: "ecommerce", label: "E-commerce & Tiendas" },
  { id: "services", label: "Salud & Servicios" },
  { id: "creative", label: "Creativos & Diseño" },
  { id: "startups", label: "Startups & Tech" },
];

const filteredComments = computed(() => {
  if (selectedCategory.value === "all") return allComments;
  return allComments.filter((c) => c.category === selectedCategory.value);
});
</script>

<template>
  <div class="w-full">
    <!-- FILTROS INTERACTIVOS DE TESTIMONIOS -->
    <div class="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 px-4">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="selectedCategory = cat.id"
        :class="[
          'px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer shadow-sm',
          selectedCategory === cat.id
            ? 'bg-[#1D4580] text-white shadow-md scale-105'
            : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-[#1D4580]'
        ]"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- GRILLA DE TESTIMONIOS -->
    <div
      class="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 px-4 md:grid-cols-2 md:px-6"
    >
      <article
        v-for="item in filteredComments"
        :key="item.id"
        data-aos="fade-up"
        :data-aos-delay="(item.id % 2) * 120"
        class="group relative flex flex-col justify-between rounded-3xl bg-white p-6 md:p-7 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
      >
        <div>
          <!-- Estrellas de valoración, comilla y etiqueta de categoría -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <div class="flex gap-1 text-[#FFB446]">
                <IconStarFilled
                  v-for="s in item.stars"
                  :key="s"
                  class="w-4 h-4 md:w-5 md:h-5"
                />
              </div>
              <span class="text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                {{ item.categoryLabel }}
              </span>
            </div>
            <IconQuote class="w-8 h-8 text-[#9FE7F5]/40" />
          </div>

          <!-- Comentario -->
          <paragraph-components class="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-secondary">
            "{{ item.comment }}"
          </paragraph-components>
        </div>

        <!-- Datos del autor -->
        <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
          <div class="shrink-0 relative">
            <img
              :src="item.img"
              :alt="item.name"
              class="h-13 w-13 rounded-full object-cover ring-2 ring-[#FF6D2A]/30 shadow-md group-hover:scale-105 transition-transform"
            />
          </div>
          <div class="min-w-0 flex-1">
            <h3
              class="text-[#2E5A8F] text-base md:text-lg font-bold font-primary truncate"
            >
              {{ item.name }}
            </h3>
            <p class="text-xs md:text-sm text-gray-500 font-secondary truncate">
              {{ item.role }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
