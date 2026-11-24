<script setup>
import Copec from "@/assets/associates/copec.png";
import Mall from "@/assets/associates/mallplaza.png";
import Derco from "@/assets/associates/derco.png";
import AguasAndinas from "@/assets/associates/aguasandinas.png";
import Sodimac from "@/assets/associates/sodimac.png";
</script>

<template>
  <section
    class="flex flex-col sm:flex-row justify-center gap-5 md:gap-15 lg:gap-20 xl:gap-30 items-center flex-wrap w-full py-6 opacity-85 hover:opacity-100 transition-opacity"
    data-aos="fade-up"
    data-aos-duration="800"
  >
    <div class="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105">
      <img :src="Copec" alt="Copec logo" />
    </div>
    <div class="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105">
      <img :src="Mall" alt="Mall Plaza logo" />
    </div>
    <div class="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105">
      <img :src="Derco" alt="Derco logo" />
    </div>
    <div class="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105">
      <img :src="AguasAndinas" alt="Aguas Andinas logo" />
    </div>
    <div class="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105">
      <img :src="Sodimac" alt="Sodimac logo" />
    </div>
  </section>
</template>
