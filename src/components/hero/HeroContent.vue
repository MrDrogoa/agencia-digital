<script setup>
import ButtonSingleComponents from "@/components/buttons/ButtonSingleComponents.vue";
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const openBooking = () => {
  window.open("/booking", "_blank");
};

const scrollToDetails = () => {
  const section = document.getElementById("services-section") || document.querySelector("main");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push("/aboutus");
  }
};
</script>

<template>
  <div class="text-center lg:text-start">
    <button-single-components @click="openBooking" class="cursor-pointer">
      Agendar Cita
    </button-single-components>
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
      Convertimos tu visión en resultados tangibles. En MisiDev diseñamos sitios web
      estratégicos, rápidos y atractivos. Acompañamos tanto a quienes inician su presencia
      online desde cero, como a negocios y startups que buscan optimizar sus ventas y crecer.
    </paragraph-components>
    <button-all-components @click="scrollToDetails" class="cursor-pointer">
      Conocer Más
    </button-all-components>
  </div>
</template>
