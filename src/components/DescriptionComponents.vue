<script setup>
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";
</script>

<template>
  <section class="pt-8 md:pt-20 lg:pt-25 xl:pt-30">
    <h2
      class="text-3xl font-bold text-center font-primary text-[#2E5A8F] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
    >
      Misión
    </h2>
    <paragraph-components
      class="sm:w-[65%] md:w-[70%] lg:w-[75%] xl:w-[80%] mx-auto text-center pt-3 md:pt-4 lg:pt-6"
    >
      En nuestra agencia, estamos dedicados a brindar servicios de primera
      calidad que ayuden a nuestros clientes a alcanzar sus objetivos. Creemos
      en la innovación, la creatividad y la colaboración para ofrecer resultados
      excepcionales. Nuestro equipo de expertos es apasionado por lo que hace y
      se esfuerza por superar las expectativas en cada proyecto. Estamos
      comprometidos en construir relaciones duraderas con nuestros clientes
      basadas en la confianza y el éxito mutuo. Acompáñanos en este camino
      mientras seguimos rompiendo límites y creando soluciones impactantes para
      nuestros clientes.
    </paragraph-components>
    <div class="flex justify-center">
      <button-all-components class="m-auto">Ver más</button-all-components>
    </div>
  </section>
</template>
