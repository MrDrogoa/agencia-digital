<script setup>
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";

const text = {
  title: "Visión",
  paragraph:
    "En MisiDev, nuestra meta principal es convertirnos en un referente de desarrollo digital en Chile, destacando por nuestra capacidad de crear soluciones tecnológicas que no solo sean funcionales, sino también sostenibles y humanas. Nuestro objetivo es acompañar a cada cliente en su proceso de transformación digital, integrando prácticas éticas y de calidad que aseguren un crecimiento a largo plazo tanto para sus negocios como para el entorno que nos rodea.",
};
</script>

<template>
  <div class="pt-8 md:pt-20 lg:pt-25 xl:pt-30">
    <h2
      class="font-primary text-[#2E5A8F] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center"
    >
      {{ text.title }}
    </h2>
    <paragraph-components
      class="md:w-150 xl:w-170 text-center m-auto pt-3 md:pt-4 lg:pt-6"
      >{{ text.paragraph }}</paragraph-components
    >
  </div>
</template>
