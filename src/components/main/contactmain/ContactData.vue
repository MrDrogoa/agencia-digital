<script setup>
import ParagraphPageComponents from "@/components/font/ParagraphPageComponents.vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import {
  IconPhoneFilled,
  IconMailFilled,
  IconClockFilled,
  IconCalendarEventFilled,
  IconMapPinFilled,
  IconCalendarPlus,
  IconBrandWhatsapp,
} from "@tabler/icons-vue";

const props = defineProps({
  contact: {
    type: Object,
    default: () => ({
      title: "Hablemos de Tu Proyecto",
      description:
        "En MisiDev te acompañamos en cada etapa de tu presencia digital. Ya sea que estés lanzando tu primer sitio web o buscando optimizar tus conversiones, estamos listos para asesorarte con honestidad y soluciones a medida.",
      email: "picisdaniel2016@gmail.com",
      phone: "+56 9 6285 7073",
      hours: "Lunes a Sábado: 10:00 a 19:00 hrs",
      location: "Santiago, Chile",
    }),
  },
});

const openBooking = () => {
  window.open("/booking", "_blank");
};
</script>

<template>
  <div
    class="bg-linear-to-b from-[#419FBC] to-[#063F5C] p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl text-white flex flex-col justify-between shadow-2xl"
  >
    <div>
      <h2
        class="text-center md:text-left font-primary text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4"
      >
        {{ props.contact.title }}
      </h2>

      <paragraph-page-components
        class="py-3 md:py-4 text-gray-200 text-left leading-relaxed"
      >
        {{ props.contact.description }}
      </paragraph-page-components>

      <!-- Lista de canales de contacto directo -->
      <div class="space-y-4 my-6 text-left">
        <!-- Email -->
        <a
          :href="`mailto:${props.contact.email}`"
          class="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition group"
        >
          <div
            class="bg-linear-to-r from-[#FF6D2A] to-[#FFB446] p-2.5 rounded-xl text-white shrink-0"
          >
            <IconMailFilled class="w-5 h-5" />
          </div>
          <div>
            <p class="text-xs text-gray-300">Correo Electrónico</p>
            <p
              class="text-sm font-semibold text-white group-hover:text-[#9FE7F5] transition"
            >
              {{ props.contact.email }}
            </p>
          </div>
        </a>

        <!-- Horario de Citas -->
        <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10">
          <div class="bg-white/15 p-2.5 rounded-xl text-[#9FE7F5] shrink-0">
            <IconClockFilled class="w-5 h-5" />
          </div>
          <div>
            <p class="text-xs text-gray-300">Horario de Atención y Citas</p>
            <p class="text-sm font-semibold text-white">
              {{ props.contact.hours }}
            </p>
          </div>
        </div>

        <!-- WhatsApp / Teléfono -->
        <a
          href="https://wa.me/56962857073"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition group"
        >
          <div class="bg-[#25D366] p-2.5 rounded-xl text-white shrink-0">
            <IconBrandWhatsapp class="w-5 h-5" />
          </div>
          <div>
            <p class="text-xs text-gray-300">WhatsApp Directo</p>
            <p
              class="text-sm font-semibold text-white group-hover:text-[#9FE7F5] transition"
            >
              {{ props.contact.phone }}
            </p>
          </div>
        </a>

        <!-- Ubicación -->
        <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10">
          <div class="bg-white/15 p-2.5 rounded-xl text-[#9FE7F5] shrink-0">
            <IconMapPinFilled class="w-5 h-5" />
          </div>
          <div>
            <p class="text-xs text-gray-300">Ubicación</p>
            <p class="text-sm font-semibold text-white">
              {{ props.contact.location }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTÓN DESTACADO PARA ABRIR SISTEMA DE CITAS -->
    <div class="pt-4 border-t border-white/15">
      <ButtonAllComponents
        @click="openBooking"
        class="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-98 transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
      >
        <IconCalendarPlus class="w-5 h-5" />
        Abrir Calendario y Agendar Cita
      </ButtonAllComponents>
      <p class="text-[11px] text-gray-300 text-center mt-2">
        Se abrirá en una ventana aparte con disponibilidad inmediata (10 a 19
        hrs)
      </p>
    </div>
  </div>
</template>
