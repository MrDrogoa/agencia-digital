<script setup>
import { useRouter } from "vue-router";
import {
  IconCalculator,
  IconSparkles,
  IconArrowRight,
} from "@tabler/icons-vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";

const router = useRouter();

const goToCalculator = () => {
  router.push("/cotizador");
};
</script>

<template>
  <section
    data-aos="zoom-in"
    data-aos-duration="800"
    class="pt-8 md:pt-20 lg:pt-25 xl:pt-30 max-w-6xl mx-auto px-4"
  >
    <div
      class="bg-linear-to-r from-[#1D4580] via-[#204A8A] to-[#063F5C] rounded-4xl p-8 sm:p-10 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
    >
      <!-- Decoración luminosa -->
      <div
        class="absolute -top-20 -left-20 w-64 h-64 bg-[#FF6D2A]/20 rounded-full blur-3xl pointer-events-none"
      ></div>
      <div
        class="absolute -bottom-20 -right-20 w-64 h-64 bg-[#9FE7F5]/15 rounded-full blur-3xl pointer-events-none"
      ></div>

      <div class="text-center lg:text-left max-w-2xl relative z-10">
        <div
          class="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#FFB446] mb-3"
        >
          <IconSparkles class="w-3.5 h-3.5" />
          <span>Calculadora de Presupuestos en Vivo</span>
        </div>
        <h3
          class="font-primary text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white mb-2"
        >
          ¿Cuánto cuesta tu proyecto web en MisiDev?
        </h3>
        <p
          class="font-secondary text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed"
        >
          Usa nuestro cotizador interactivo paso a paso y obtén una estimación
          de inversión y tiempos de entrega en menos de 1 minuto.
        </p>
      </div>

      <div class="relative z-10 shrink-0">
        <ButtonAllComponents
          @click="goToCalculator"
          class="px-7 py-4 rounded-3xl font-secondary font-bold text-sm sm:text-base text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer flex items-center gap-3 group"
        >
          <IconCalculator class="w-5 h-5" />
          <span>Calcular Presupuesto Online</span>
          <IconArrowRight
            class="w-4 h-4 transition-transform group-hover:translate-x-1"
          />
        </ButtonAllComponents>
      </div>
    </div>
  </section>
</template>
