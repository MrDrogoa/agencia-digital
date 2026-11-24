<script setup>
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import TextH2PagesComponents from "@/components/font/TextH2PagesComponents.vue";
const text = {
  title: "Nuestra Visión",
  paragraph:
    "En MisiDev, nuestra meta es convertirnos en un referente de desarrollo web y diseño estratégico en Chile y Latinoamérica. Ayudamos a negocios emergentes y marcas consolidadas a proyectar excelencia con sitios web rápidos, seguros y pensados para convertir. Creemos en el trabajo cercano, la transparencia en los plazos y la calidad en cada detalle.",
};

const openBooking = () => {
  window.open("/booking", "_blank");
};
</script>

<template>
  <div class="pt-8 md:pt-20 lg:pt-25 xl:pt-30">
    <text-h2-pages-components class="text-[#2E5A8F] text-center">
      {{ text.title }}
    </text-h2-pages-components>
    <paragraph-components
      class="md:w-150 xl:w-170 text-center m-auto pt-3 md:pt-4 lg:pt-6"
    >
      {{ text.paragraph }}
    </paragraph-components>

    <div class="flex justify-center">
      <button-all-components @click="openBooking">
        Agendar una Cita
      </button-all-components>
    </div>
  </div>
</template>
