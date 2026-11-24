<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { IconCalendarPlus, IconBrandWhatsapp } from "@tabler/icons-vue";

const route = useRoute();
const hideFloating = computed(() =>
  ["/booking", "/admin", "/cotizador"].includes(route.path)
);

const openBooking = () => {
  window.open("/booking", "_blank");
};

const openWhatsapp = () => {
  window.open(
    "https://wa.me/56962857073?text=Hola%20MisiDev,%20me%20gustar%C3%ADa%20hacerles%20una%20consulta",
    "_blank",
  );
};
</script>

<template>
  <aside
    v-if="!hideFloating"
    class="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 pointer-events-auto select-none"
  >
    <!-- Botón WhatsApp -->
    <button
      @click="openWhatsapp"
      class="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      aria-label="Contactar por WhatsApp"
    >
      <span
        class="pointer-events-none hidden sm:block absolute right-14 bg-[#1D4580] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
      >
        WhatsApp
      </span>
      <IconBrandWhatsapp class="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
    </button>

    <!-- Botón Destacado Agendar Cita -->
    <button
      @click="openBooking"
      class="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white/40"
      aria-label="Abrir calendario y agendar cita"
    >
      <span
        class="pointer-events-none hidden sm:block absolute right-14 bg-[#1D4580] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
      >
        Agendar Cita
      </span>
      <IconCalendarPlus class="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
    </button>
  </aside>
</template>
