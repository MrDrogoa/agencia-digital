<script setup>
import {
  IconPhone,
  IconCalendarPlus,
  IconBrandWhatsapp,
} from "@tabler/icons-vue";

const openBooking = () => {
  window.open("/booking", "_blank");
};

const openWhatsapp = () => {
  window.open(
    "https://wa.me/56962857073?text=Hola%20MisiDev,%20me%20gustar%C3%ADa%20comenzar%20mi%20proyecto",
    "_blank",
  );
};
</script>

<template>
  <section
    class="w-full mt-8 md:mt-16 bg-linear-to-r from-[#1D4580] via-[#204A8A] to-[#063F5C] py-6 sm:py-8 lg:py-10 px-4 shadow-xl"
  >
    <div
      class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div class="flex items-center gap-4 text-center md:text-left">
        <div
          class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-[#9FE7F5]"
        >
          <IconPhone class="w-8 h-8" />
        </div>
        <div>
          <h3
            class="font-primary text-2xl sm:text-3xl md:text-4xl font-extrabold text-white"
          >
            ¿Comenzamos tu proyecto hoy?
          </h3>
          <p class="text-xs sm:text-sm text-gray-200 font-secondary mt-1">
            Asesoría estratégica directa y presupuesto transparente adaptado a
            tu negocio.
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3 shrink-0">
        <button
          @click="openBooking"
          class="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer flex items-center gap-2"
        >
          <IconCalendarPlus class="w-4 h-4" />
          <span>Agendar Cita (10 a 19 hrs)</span>
        </button>

        <button
          @click="openWhatsapp"
          class="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm text-[#1D4580] bg-white hover:bg-gray-100 active:scale-95 transition shadow-md cursor-pointer flex items-center gap-2"
        >
          <IconBrandWhatsapp class="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp Directo</span>
        </button>
      </div>
    </div>
  </section>
</template>
