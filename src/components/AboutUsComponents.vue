<script setup>
import CardsAboutUs from "@/components/main/aboutusmain/CardsAboutUs.vue";
import TextH2Components from "@/components/font/TextH2Components.vue";
import TextAboutUs from "@/components/main/aboutusmain/TextAboutUs.vue";
</script>

<template>
  <section
    class="max-w-325 mx-auto pt-8 md:pt-20 lg:pt-25 xl:pt-30 px-4 xl:px-0"
  >
    <text-h2-components class="text-center">Titulo</text-h2-components>
    <cards-about-us />
    <text-about-us />
  </section>
</template>
