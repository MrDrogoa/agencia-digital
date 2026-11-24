<script setup>
import { ref } from "vue";
import {
  IconHeadset,
  IconBrandWhatsapp,
  IconMail,
  IconCalendarEvent,
  IconChevronDown,
  IconCircleCheck,
  IconClock,
  IconHelp,
  IconSend,
  IconSparkles,
} from "@tabler/icons-vue";

const activeFaq = ref(0);

const toggleFaq = (idx) => {
  activeFaq.value = activeFaq.value === idx ? null : idx;
};

const openBooking = () => {
  window.open("/booking", "_blank");
};

const openWhatsapp = () => {
  window.open("https://wa.me/56962857073?text=Hola%20MisiDev,%20necesito%20soporte%20t%C3%A9cnico%20para%20mi%20sitio%20web", "_blank");
};

const supportChannels = [
  {
    icon: IconBrandWhatsapp,
    color: "bg-[#25D366]",
    title: "WhatsApp Directo",
    badge: "Respuesta Rápida",
    desc: "Atención inmediata para consultas urgentes, ajustes de contenido y soporte en vivo.",
    actionText: "Escribir a WhatsApp",
    action: openWhatsapp,
  },
  {
    icon: IconMail,
    color: "bg-[#1D4580]",
    title: "Correo Electrónico",
    badge: "Soporte Formal",
    desc: "Envíanos detalles técnicos, accesos, requerimientos o reportes con imágenes adjuntas.",
    emailDisplay: "picisdaniel2016@gmail.com",
    actionText: "Enviar Correo",
    href: "mailto:picisdaniel2016@gmail.com",
  },
  {
    icon: IconCalendarEvent,
    color: "bg-linear-to-r from-[#FF6D2A] to-[#FFB446]",
    title: "Reunión de Diagnóstico",
    badge: "10:00 a 19:00 hrs",
    desc: "Agenda una videollamada de revisión para planificar mejoras o revisar el rendimiento de tu web.",
    actionText: "Agendar Sesión",
    action: openBooking,
  },
];

const faqs = [
  {
    question: "¿Qué garantía y soporte incluye el desarrollo de mi sitio web?",
    answer:
      "Todos los sitios desarrollados por MisiDev cuentan con 3 meses de soporte técnico y garantía de estabilidad post-lanzamiento. Durante este periodo resolvemos cualquier anomalía, corregimos errores imprevistos y aseguramos que todos los formularios, enlaces y pasarelas de pago funcionen al 100%.",
  },
  {
    question: "¿Cómo puedo solicitar cambios o nuevas funcionalidades en mi sitio?",
    answer:
      "Puedes escribirnos directamente a nuestro WhatsApp o correo indicando las modificaciones deseadas. Si se trata de un ajuste menor, lo implementamos de forma ágil; si es un nuevo módulo o rediseño estructural, coordinamos una reunión de alcance para darte un presupuesto exacto y fecha de entrega garantizada.",
  },
  {
    question: "¿Qué ocurre si mi web se cae o experimenta una lentitud inusual?",
    answer:
      "Priorizamos las contingencias críticas. Si tu servidor o hosting presenta problemas de caída, puedes notificarnos vía WhatsApp de soporte y revisaremos la conectividad, registros de error (logs) y certificados SSL de inmediato para restaurar la operatividad en el menor tiempo posible.",
  },
  {
    question: "¿Puedo autogestionar el contenido de mi web o tienda online?",
    answer:
      "¡Por supuesto! Diseñamos nuestras plataformas con arquitectura clara y paneles amigables (WordPress, paneles headless o APIs sencillas) para que puedas subir productos, editar textos o cambiar fotos tú mismo. Además, te entregamos una videoguía personalizada de uso.",
  },
  {
    question: "¿Cómo funcionan los horarios de atención para soporte?",
    answer:
      "Nuestro horario de atención oficial y reuniones es de Lunes a Sábado de 10:00 a 19:00 hrs (hora de Chile). Para incidencias críticas de servidores fuera de horario, contamos con monitoreo para responder con la mayor prontitud posible.",
  },
];
</script>

<template>
  <section class="max-w-5xl mx-auto px-4 py-8 md:py-16 text-left">
    <!-- Header -->
    <div
      data-aos="fade-down"
      data-aos-duration="700"
      class="text-center max-w-3xl mx-auto mb-12 md:mb-16"
    >
      <div class="inline-flex items-center gap-2 bg-[#1D4580]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#1D4580] mb-4">
        <IconHeadset class="w-4 h-4 text-[#FF6D2A]" />
        <span>Centro de Asistencia & Soporte MisiDev</span>
      </div>

      <h1 class="font-primary text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D4580] mb-4">
        ¿Cómo Podemos Ayudarte Hoy?
      </h1>
      <p class="font-secondary text-sm sm:text-base text-gray-600 leading-relaxed">
        Estamos comprometidos con el éxito continuo de tu negocio. Si necesitas asistencia técnica, ajustes en tu sitio web o resolver cualquier inquietud, aquí tienes nuestros canales directos.
      </p>
    </div>

    <!-- Canales de Soporte Directo -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <article
        v-for="(channel, idx) in supportChannels"
        :key="idx"
        data-aos="fade-up"
        :data-aos-delay="idx * 120"
        class="bg-white rounded-3xl p-6 lg:p-7 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <div :class="['w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-md', channel.color]">
              <component :is="channel.icon" class="w-6 h-6" />
            </div>
            <span class="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
              {{ channel.badge }}
            </span>
          </div>

          <h3 class="font-primary text-xl font-bold text-[#1D4580] mb-2">
            {{ channel.title }}
          </h3>
          <p class="font-secondary text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
            {{ channel.desc }}
          </p>
          <p
            v-if="channel.emailDisplay"
            class="text-[11px] sm:text-xs font-semibold text-[#1D4580] bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1.5 mb-4 text-center break-all select-all"
          >
            {{ channel.emailDisplay }}
          </p>
        </div>

        <div>
          <button
            v-if="channel.action"
            @click="channel.action"
            class="w-full py-3 px-3 lg:px-4 rounded-2xl font-bold text-xs lg:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-md cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>{{ channel.actionText }}</span>
          </button>
          <a
            v-else-if="channel.href"
            :href="channel.href"
            class="w-full py-3 px-3 lg:px-4 rounded-2xl font-bold text-xs lg:text-sm text-[#1D4580] bg-slate-100 hover:bg-slate-200 active:scale-95 transition shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>{{ channel.actionText }}</span>
          </a>
        </div>
      </article>
    </div>

    <!-- Sección de Preguntas Frecuentes (FAQ) -->
    <div class="mt-12" data-aos="fade-up" data-aos-duration="800">
      <div class="text-center mb-8">
        <h2 class="font-primary text-2xl sm:text-3xl font-extrabold text-[#1D4580] mb-2">
          Preguntas Frecuentes
        </h2>
        <p class="font-secondary text-xs sm:text-sm text-gray-500">
          Respuestas rápidas a las consultas más habituales sobre nuestros servicios y mantenimiento.
        </p>
      </div>

      <div class="space-y-4 max-w-4xl mx-auto">
        <div
          v-for="(faq, fIdx) in faqs"
          :key="fIdx"
          class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
        >
          <button
            @click="toggleFaq(fIdx)"
            class="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition"
          >
            <span class="font-primary font-bold text-sm sm:text-base text-[#1D4580]">
              {{ faq.question }}
            </span>
            <IconChevronDown
              :class="[
                'w-5 h-5 text-[#FF6D2A] shrink-0 transition-transform duration-300',
                activeFaq === fIdx ? 'rotate-180' : ''
              ]"
            />
          </button>

          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-show="activeFaq === fIdx" class="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 font-secondary leading-relaxed border-t border-gray-50 pt-3">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- CTA de Cierre -->
    <div
      data-aos="zoom-in"
      data-aos-duration="800"
      class="mt-16 bg-gradient-to-r from-[#1D4580] via-[#204A8A] to-[#063F5C] rounded-3xl p-8 sm:p-10 text-white shadow-xl text-center"
    >
      <h3 class="font-primary text-2xl sm:text-3xl font-extrabold mb-3">
        ¿Aún tienes dudas técnicas sobre tu proyecto?
      </h3>
      <p class="font-secondary text-xs sm:text-sm text-gray-200 max-w-xl mx-auto mb-6 leading-relaxed">
        Conversa directamente con Daniel y el equipo de desarrollo. Te atenderemos con gusto para darte una solución clara.
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <button
          @click="openWhatsapp"
          class="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-[#1D4580] bg-white hover:bg-gray-100 active:scale-95 transition shadow-md cursor-pointer flex items-center gap-2"
        >
          <IconBrandWhatsapp class="w-4 h-4 text-[#25D366]" />
          <span>Hablar por WhatsApp</span>
        </button>

        <button
          @click="openBooking"
          class="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer flex items-center gap-2"
        >
          <IconCalendarEvent class="w-4 h-4" />
          <span>Agendar Videollamada (10 a 19 hrs)</span>
        </button>
      </div>
    </div>
  </section>
</template>
