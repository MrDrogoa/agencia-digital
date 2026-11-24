<script setup>
import {
  IconShieldCheck,
  IconLock,
  IconEyeCheck,
  IconCookie,
  IconUserCheck,
  IconMail,
  IconCalendarEvent,
} from "@tabler/icons-vue";

const sections = [
  {
    icon: IconEyeCheck,
    title: "1. Información que Recopilamos",
    content:
      "En MisiDev únicamente recopilamos los datos estrictamente necesarios para interactuar con nuestros clientes y usuarios: nombre, dirección de correo electrónico, número de teléfono (WhatsApp) y detalles sobre los requerimientos de tu proyecto o fecha agendada a través de nuestros formularios.",
  },
  {
    icon: IconLock,
    title: "2. Finalidad y Uso de tus Datos",
    content:
      "La información recopilada se utiliza con el único propósito de responder a tus solicitudes de cotización, coordinar reuniones de proyecto en nuestro sistema de citas (de 10:00 a 19:00 hrs) y enviarte confirmaciones por correo electrónico. No enviamos spam ni publicidad no solicitada.",
  },
  {
    icon: IconShieldCheck,
    title: "3. Confidencialidad y No Divulgación",
    content:
      "MisiDev no vende, arrienda, comercializa ni transfiere tus datos personales a terceros bajo ninguna circunstancia. Toda la información de tu proyecto, modelos de negocio e ideas compartidas se tratan bajo estricta confidencialidad profesional.",
  },
  {
    icon: IconCookie,
    title: "4. Cookies y Rendimiento Técnico",
    content:
      "Utilizamos cookies y tecnologías de analítica básicas para garantizar que la plataforma cargue de manera fluida y para medir el rendimiento de navegación de nuestro sitio web. Puedes configurar o desactivar las cookies en cualquier momento desde las preferencias de tu navegador.",
  },
  {
    icon: IconUserCheck,
    title: "5. Tus Derechos como Titular de los Datos",
    content:
      "De acuerdo con la legislación vigente de protección de datos personales, tienes derecho a solicitar la confirmación, modificación, actualización o eliminación completa de tu información de nuestros registros en cualquier momento.",
  },
];

const openBooking = () => {
  window.open("/booking", "_blank");
};
</script>

<template>
  <section class="max-w-5xl mx-auto px-4 py-8 md:py-16 text-left">
    <!-- Header de la página -->
    <div
      data-aos="fade-down"
      data-aos-duration="700"
      class="text-center max-w-3xl mx-auto mb-12 md:mb-16"
    >
      <div class="inline-flex items-center gap-2 bg-[#1D4580]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#1D4580] mb-4">
        <IconShieldCheck class="w-4 h-4 text-[#FF6D2A]" />
        <span>Compromiso con tu Privacidad</span>
      </div>

      <h1 class="font-primary text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D4580] mb-4">
        Políticas de Privacidad
      </h1>
      <p class="font-secondary text-sm sm:text-base text-gray-600 leading-relaxed">
        En MisiDev valoramos tu confianza. Aquí te explicamos con claridad y sin letra chica cómo protegemos y gestionamos tu información cuando visitas nuestro sitio o solicitas nuestros servicios.
      </p>
      <p class="text-xs text-gray-400 mt-2">Última actualización: Noviembre 2026</p>
    </div>

    <!-- Secciones ordenadas en tarjetas -->
    <div class="space-y-6">
      <article
        v-for="(sec, idx) in sections"
        :key="idx"
        data-aos="fade-up"
        :data-aos-delay="idx * 100"
        class="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-5 items-start"
      >
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#FF6D2A] to-[#FFB446] text-white flex items-center justify-center shrink-0 shadow-md">
          <component :is="sec.icon" class="w-6 h-6" />
        </div>

        <div class="flex-1">
          <h2 class="font-primary text-lg sm:text-xl font-bold text-[#1D4580] mb-2">
            {{ sec.title }}
          </h2>
          <p class="font-secondary text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
            {{ sec.content }}
          </p>
        </div>
      </article>
    </div>

    <!-- Bloque de contacto directo para dudas de privacidad -->
    <div
      data-aos="zoom-in"
      data-aos-duration="800"
      class="mt-12 bg-gradient-to-r from-[#1D4580] to-[#063F5C] rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div>
        <h3 class="font-primary text-xl sm:text-2xl font-bold mb-2">
          ¿Tienes consultas sobre tus datos personales?
        </h3>
        <p class="font-secondary text-xs sm:text-sm text-gray-200 leading-relaxed">
          Escríbenos directamente a nuestro correo de administración y resolveremos tu solicitud con total agilidad.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <a
          href="mailto:picisdaniel2016@gmail.com"
          class="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm text-[#1D4580] bg-white hover:bg-gray-100 transition shadow-md flex items-center gap-2"
        >
          <IconMail class="w-4 h-4 text-[#FF6D2A]" />
          <span>picisdaniel2016@gmail.com</span>
        </a>

        <button
          @click="openBooking"
          class="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer flex items-center gap-2"
        >
          <IconCalendarEvent class="w-4 h-4" />
          <span>Agendar Asesoría</span>
        </button>
      </div>
    </div>
  </section>
</template>
