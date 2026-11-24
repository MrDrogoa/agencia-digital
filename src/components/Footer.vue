<script setup>
import { ref, computed } from "vue";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandBehance,
  IconBrandLinkedin,
  IconCopyright,
  IconSend,
  IconCheck,
} from "@tabler/icons-vue";
import logoFooter from "@/assets/logoFooter.svg";

const BASE_API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4002/api").replace(/\/+$/, "");

const newsletterEmail = ref("");
const newsletterWebsiteUrl = ref("");
const isSubscribed = ref(false);
const isSubmittingNewsletter = ref(false);
const newsletterError = ref("");
const newsletterMessage = ref("¡Gracias por suscribirte a las novedades de MisiDev!");

const handleNewsletter = async () => {
  if (newsletterWebsiteUrl.value && newsletterWebsiteUrl.value.trim() !== "") {
    return;
  }

  newsletterError.value = "";
  const email = newsletterEmail.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newsletterError.value = "Ingresa un correo electrónico válido.";
    return;
  }

  isSubmittingNewsletter.value = true;
  try {
    const res = await fetch(`${BASE_API_URL}/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        website_url: newsletterWebsiteUrl.value,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "No pudimos registrar tu suscripción. Intenta nuevamente.");
    }

    newsletterMessage.value = data.message || "¡Gracias por suscribirte a las novedades de MisiDev!";
    isSubscribed.value = true;
    newsletterEmail.value = "";
  } catch (err) {
    newsletterError.value = err.message || "No pudimos registrar tu suscripción. Intenta nuevamente.";
  } finally {
    isSubmittingNewsletter.value = false;
  }
};

const props = defineProps({
  companyName: {
    type: String,
    default: "MisiDev",
  },
  description: {
    type: String,
    default:
      "Agencia de diseño y desarrollo web en Chile. Ayudamos a emprendedores, pymes y creadores a consolidar su presencia digital con soluciones funcionales, estratégicas y de alto impacto.",
  },
  socialLinks: {
    type: Array,
    default: () => [
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: IconBrandLinkedin,
      },
      {
        name: "Instagram",
        url: "https://instagram.com",
        icon: IconBrandInstagram,
      },
      { name: "Behance", url: "https://behance.net", icon: IconBrandBehance },
      {
        name: "Facebook",
        url: "https://facebook.com",
        icon: IconBrandFacebook,
      },
    ],
  },
  columns: {
    type: Array,
    default: () => [
      {
        title: "Explorar",
        items: [
          { text: "Inicio", link: "/" },
          { text: "Sobre Nosotros", link: "/aboutus" },
          { text: "Portafolio de Trabajos", link: "/works" },
          { text: "Casos de Éxito", link: "/success" },
          { text: "Cotizador Online", link: "/cotizador" },
        ],
      },
      {
        title: "Atención & Citas",
        items: [
          { text: "Agendar Reunión (10 a 19 hrs)", link: "/booking" },
          {
            text: "picisdaniel2016@gmail.com",
            link: "mailto:picisdaniel2016@gmail.com",
          },
          { text: "Formulario de Contacto", link: "/contact" },
          { text: "Santiago, Chile", link: null },
        ],
      },
      {
        title: "Soporte & Legal",
        items: [
          { text: "Centro de Soporte Técnico", link: "/support" },
          { text: "Políticas de Privacidad", link: "/privacy" },
          { text: "Preguntas Frecuentes (FAQ)", link: "/support" },
          {
            text: "WhatsApp: +56 9 6285 7073",
            link: "https://wa.me/56962857073",
          },
        ],
      },
    ],
  },
});

const logo = logoFooter;
const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="pt-8 md:pt-20 lg:pt-25 xl:pt-30">
    <section class="bg-linear-to-b from-[#1D4580] to-[#063F5C] text-white">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20 pb-16 sm:pb-12"
      >
        <!-- Main Footer Content -->
        <div
          class="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap gap-8 md:gap-12 mb-12"
        >
          <!-- Logo Section -->
          <div class="flex-1 min-w-62.5 xl:max-w-75">
            <router-link to="/">
              <img
                :src="logo"
                :alt="companyName"
                class="h-16 lg:h-25 w-auto mb-4 rounded-2xl"
              />
            </router-link>
            <p class="text-sm text-gray-300 font-medium mb-6 leading-relaxed">
              {{ description }}
            </p>

            <!-- Social Icons -->
            <div class="flex gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                :aria-label="social.name"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative isolate flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-[#1D4580] transition-transform duration-300 ease-[cubic-bezier(0.48,0,0.12,1)] hover:scale-105"
              >
                <span
                  class="absolute inset-0 translate-y-full bg-linear-to-r from-[#FF6D2A] to-[#FFB446] transition-transform duration-500 ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:translate-y-0"
                ></span>
                <component
                  :is="social.icon"
                  class="relative z-10 h-7 w-7 transition-colors duration-300 group-hover:text-white"
                />
              </a>
            </div>
          </div>

          <!-- Footer Columns -->
          <div
            v-for="(column, index) in columns"
            :key="index"
            class="flex-1 min-w-50"
          >
            <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
              {{ column.title }}
            </h3>
            <ul class="space-y-2">
              <li v-for="(item, itemIndex) in column.items" :key="itemIndex">
                <router-link
                  v-if="item.link && item.link.startsWith('/')"
                  :to="item.link"
                  class="text-sm text-gray-300 hover:text-[#FFB446] transition-colors"
                >
                  {{ item.text }}
                </router-link>
                <a
                  v-else-if="item.link"
                  :href="item.link"
                  class="text-sm text-gray-300 hover:text-[#FFB446] transition-colors"
                  :target="item.link.startsWith('http') ? '_blank' : undefined"
                  :rel="
                    item.link.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  "
                >
                  {{ item.text }}
                </a>
                <span v-else class="text-sm text-gray-300">
                  {{ item.text }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Newsletter / Asesoría Express -->
        <div
          class="mb-10 p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div class="text-center md:text-left">
            <h4 class="text-lg md:text-xl font-bold font-primary text-white">
              ¿Quieres recibir consejos para digitalizar tu negocio?
            </h4>
            <p class="text-xs sm:text-sm text-gray-300 font-secondary mt-1">
              Te compartimos guías prácticas sobre diseño UX/UI, velocidad web y
              conversión sin spam.
            </p>
          </div>

          <div class="w-full md:w-auto">
            <form
              v-if="!isSubscribed"
              @submit.prevent="handleNewsletter"
              class="w-full max-w-md"
              novalidate
            >
              <!-- Campo Honeypot Anti-Bots -->
              <div
                class="absolute -left-[9999px] opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                aria-hidden="true"
              >
                <label for="newsletter_website_url">Sitio Web (No completar)</label>
                <input
                  id="newsletter_website_url"
                  v-model="newsletterWebsiteUrl"
                  type="text"
                  name="website_url"
                  tabindex="-1"
                  autocomplete="off"
                />
              </div>

              <div class="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  v-model="newsletterEmail"
                  type="email"
                  maxlength="120"
                  required
                  :disabled="isSubmittingNewsletter"
                  placeholder="Ingresa tu correo aquí..."
                  class="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#FF6D2A] transition disabled:opacity-60"
                />
                <button
                  type="submit"
                  :disabled="isSubmittingNewsletter"
                  class="px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-md cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60"
                >
                  <span>{{ isSubmittingNewsletter ? "Enviando..." : "Suscribirme" }}</span>
                  <IconSend class="w-4 h-4" />
                </button>
              </div>
              <p
                v-if="newsletterError"
                class="mt-2 text-xs text-[#FFD3D3] text-center sm:text-left"
              >
                {{ newsletterError }}
              </p>
            </form>
            <div
              v-else
              class="flex items-center gap-2 text-[#9FE7F5] bg-white/10 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold"
            >
              <IconCheck class="w-5 h-5 text-[#FFB446]" />
              <span>{{ newsletterMessage }}</span>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-px bg-white/25 my-6"></div>

        <!-- Copyright & Legal Links -->
        <div
          class="text-center text-sm text-gray-300 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6"
        >
          <div class="flex items-center">
            <IconCopyright :size="16" class="inline-block mr-1" />
            <p>
              Copyright {{ currentYear }} | Desarrollado por {{ companyName }}
            </p>
          </div>

          <div class="flex items-center gap-3 text-xs text-gray-400">
            <router-link
              to="/privacy"
              class="hover:text-[#FFB446] transition-colors"
            >
              Políticas de Privacidad
            </router-link>
            <span>•</span>
            <router-link
              to="/support"
              class="hover:text-[#FFB446] transition-colors"
            >
              Soporte Técnico
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>
