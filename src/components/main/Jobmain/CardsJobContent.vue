<script setup>
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import {
  IconPalette,
  IconCode,
  IconWorldWww,
  IconTrendingUp,
} from "@tabler/icons-vue";

const cards = [
  {
    id: 1,
    title: "Diseño UX/UI para Clientes",
    description:
      "No usamos plantillas genéricas. Prototipamos interfaces únicas e intuitivas en Figma que capturan la esencia de tu marca, asegurando que tus usuarios tengan una experiencia de navegación atractiva y fácil desde el primer click.",
    buttonText: "Agendar Cita",
    icon: IconPalette,
  },
  {
    id: 2,
    title: "Desarrollo Web Escalable",
    description:
      "Construimos la estructura técnica de tu sitio con tecnologías modernas y seguras. Ya sea una tienda online o una plataforma a medida, garantizamos tiempos de carga rápidos y un rendimiento impecable en cualquier dispositivo móvil.",
    buttonText: "Agendar Cita",
    icon: IconCode,
  },
  {
    id: 3,
    title: "Soluciones Autogestionables",
    description:
      "Desarrollamos plataformas robustas e intuitivas utilizando herramientas como WordPress y PHP, diseñadas específicamente para darte el control. Te entregamos un sitio donde podrás actualizar tu catálogo o modificar textos con total autonomía.",
    buttonText: "Agendar Cita",
    icon: IconWorldWww,
  },
  {
    id: 4,
    title: "SEO y Posicionamiento",
    description:
      "De nada sirve un sitio web increíble si tus clientes no logran encontrarlo. Aplicamos buenas prácticas de optimización estructural, código limpio y velocidad de carga para que tu negocio escale posiciones en Google y atraiga tráfico orgánico real.",
    buttonText: "Agendar Cita",
    icon: IconTrendingUp,
  },
];

const handleCardAction = (card) => {
  const query = card ? `?service=${encodeURIComponent(card.title)}` : "";
  window.open(`/booking${query}`, "_blank");
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-6 md:gap-8"
  >
    <article
      v-for="card in cards"
      :key="card.id"
      data-aos="fade-up"
      :data-aos-delay="card.id * 120"
      class="flex w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
    >
      <div
        class="flex h-full w-full flex-col rounded-4xl border-2 border-[#2E5A8F] bg-white py-10 px-5 lg:py-14 lg:px-8 hover:shadow-2xl hover:border-[#FF6D2A] transition-all duration-300"
      >
        <div class="relative m-auto h-16 w-16">
          <div
            class="w-16 h-16 bg-[#2E5A8F] rounded-full flex items-center justify-center absolute shadow-lg group-hover:bg-[#FF6D2A] transition-colors"
          >
            <component :is="card.icon" class="text-white w-8 h-8" />
          </div>
        </div>

        <div
          class="flex flex-1 flex-col items-center justify-between text-center pt-6 lg:pt-8"
        >
          <div class="flex w-full flex-1 flex-col space-y-3">
            <h3
              class="text-[#2E5A8F] text-2xl md:text-3xl lg:text-4xl font-bold mb-5 md:mb-6 lg:mb-7 font-primary"
            >
              {{ card.title }}
            </h3>
            <p
              class="text-[#5C6F91] text-xs sm:text-sm lg:text-base leading-relaxed font-medium font-secondary"
            >
              {{ card.description }}
            </p>
          </div>

          <button-all-components
            class="mt-8 cursor-pointer"
            @click="handleCardAction(card)"
          >
            {{ card.buttonText }}
          </button-all-components>
        </div>
      </div>
    </article>
  </div>
</template>
