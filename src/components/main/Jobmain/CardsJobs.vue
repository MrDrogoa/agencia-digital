<script setup>
import CardsJobIcons from "@/components/main/Jobmain/CardsJobIcons.vue";
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";
</script>
<template>
  <section class="pt-8 md:pt-20 lg:pt-25 xl:pt-30">
    <h2
      class="font-primary text-[#2E5A8F] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-8 text-center"
    >
      ¿Cómo trabajamos en MisiDev?
    </h2>
    <div class="flex justify-center mb-4 md:mb-8">
      <div
        class="bg-[#9FE7F5] inline-flex justify-center font-semibold rounded-2xl py-1.5 lg:py-2 px-4 md:px-5 lg:px-6 shadow-lg transition-colors duration-300"
      >
        <h3
          class="text-base md:text-lg lg:text-xl text-center font-primary text-white w-full md:w-120 lg:w-100"
        >
          Resolvemos tus desafíos digitales con claridad y estrategia.
        </h3>
      </div>
    </div>

    <paragraph-components
      class="w-full md:w-130 lg:w-170 m-auto text-center mb-16"
      >Entendemos que digitalizar tu negocio puede generar dudas. Aquí te
      explicamos cómo abordamos cada proyecto para que tengas tranquilidad y
      resultados desde el primer día.</paragraph-components
    >

    <cards-job-icons />
  </section>
</template>
