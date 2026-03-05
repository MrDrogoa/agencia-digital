<script setup>
import ButtonSingleComponents from "@/components/buttons/ButtonSingleComponents.vue";
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
</script>

<template>
  <div class="text-center lg:text-start">
    <button-single-components>Get Started</button-single-components>
    <h1
      class="font-primary text-[#2E5A8F] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold pt-3 md:pt-4 lg:pt-6"
    >
      <span class="text-[#FF6D2A]">"</span>Impulsa Tu Negocio Digital<span
        class="text-[#FFB446]"
        >"</span
      >
    </h1>
    <paragraph-components
      class="w-auto sm:w-[80%] lg:w-full m-auto pt-3 md:pt-4 lg:pt-6"
    >
      Convertimos tu visión en resultados digitales. Con MISIDEV obtienes sitios
      web modernos y seguros. Acompañamos tanto a quienes inician su presencia
      online, como a empresas que buscan optimizar y crecer.
    </paragraph-components>
    <button-all-components>Ver mas</button-all-components>
  </div>
</template>
