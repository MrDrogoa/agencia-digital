<script setup>
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToAbout = () => {
  router.push("/aboutus");
};
</script>

<template>
  <section class="pt-8 md:pt-20 lg:pt-25 xl:pt-30" id="services-section" data-aos="fade-up" data-aos-duration="800">
    <h2
      class="text-3xl font-bold text-center font-primary text-[#2E5A8F] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
    >
      Nuestra Misión
    </h2>
    <paragraph-components
      class="sm:w-[65%] md:w-[70%] lg:w-[75%] xl:w-[80%] mx-auto text-center pt-3 md:pt-4 lg:pt-6"
    >
      En MisiDev ayudamos a negocios emergentes, pymes, creadores y profesionales a tener
      una presencia digital sólida con diseño estratégico y funcional. Creemos en la innovación,
      la cercanía y la honestidad técnica para entregar resultados medibles. Nuestro compromiso
      es acompañarte desde la concepción hasta el despegue de tu plataforma, construyendo una
      relación de largo plazo basada en la confianza y el crecimiento de tu negocio.
    </paragraph-components>
    <div class="flex justify-center">
      <button-all-components class="m-auto cursor-pointer" @click="goToAbout">
        Conocer Nuestra Historia
      </button-all-components>
    </div>
  </section>
</template>
