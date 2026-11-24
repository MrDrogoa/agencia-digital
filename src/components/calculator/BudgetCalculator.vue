<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  IconDevices,
  IconShoppingCart,
  IconBuildingStore,
  IconRocket,
  IconCreditCard,
  IconCalendarEvent,
  IconSearch,
  IconBrandWhatsapp,
  IconServer,
  IconClock,
  IconSparkles,
  IconCheck,
  IconRefresh,
  IconShieldCheck,
  IconCurrencyDollar,
  IconWorld,
} from "@tabler/icons-vue";
import TextH2PagesComponents from "@/components/font/TextH2PagesComponents.vue";
import ParagraphPageComponents from "@/components/font/ParagraphPageComponents.vue";
const router = useRouter();

// Moneda: 'CLP' o 'USD'
const currency = ref("CLP");
const usdRate = 950; // Tasa referencial CLP / USD

// Formateador de moneda
const formatPrice = (amountCLP) => {
  if (currency.value === "USD") {
    const amountUSD = Math.round(amountCLP / usdRate);
    return `$${amountUSD.toLocaleString("en-US")} USD`;
  }
  return `$${amountCLP.toLocaleString("es-CL")} CLP`;
};

// PASO 1: Tipo de Proyecto
const projectTypes = [
  {
    id: "landing",
    name: "Landing Page de Conversión",
    subtitle: "Página única enfocada en captar leads y ventas",
    desc: "Ideal para campañas publicitarias, lanzamientos de productos o servicios específicos.",
    priceCLP: 240000,
    timeWeeks: "1 a 2 semanas",
    icon: IconRocket,
  },
  {
    id: "corporate",
    name: "Sitio Web Corporativo / PYME",
    subtitle: "Web completa multi-sección (hasta 5 páginas)",
    desc: "Inicio, Nosotros, Servicios, Casos de Éxito y Contacto con diseño profesional y adaptativo.",
    priceCLP: 420000,
    timeWeeks: "2 a 3 semanas",
    icon: IconBuildingStore,
  },
  {
    id: "ecommerce",
    name: "Tienda Online / E-commerce",
    subtitle: "Catálogo autogestionable y carrito de compras",
    desc: "Venta de productos 24/7 con inventario, variantes y panel de administración.",
    priceCLP: 680000,
    timeWeeks: "3 a 4 semanas",
    icon: IconShoppingCart,
  },
  {
    id: "custom",
    name: "Plataforma Web a Medida",
    subtitle: "Desarrollo avanzado con lógica de negocio y APIs",
    desc: "Portales de usuarios, sistemas de gestión o integraciones personalizadas complejas.",
    priceCLP: 950000,
    timeWeeks: "4 a 6 semanas",
    icon: IconDevices,
  },
];

const selectedProjectType = ref(projectTypes[1].id);

// PASO 2: Nivel de Diseño UI/UX
const designLevels = [
  {
    id: "provided",
    name: "Ya tengo el diseño o referencias claras",
    desc: "Cuentas con wireframes, maquetas o una estructura definida lista para codificar.",
    priceCLP: 0,
  },
  {
    id: "custom_figma",
    name: "Diseño UI/UX exclusivo en Figma desde cero",
    desc: "Prototipo interactivo a medida, sistema de colores, tipografías y pruebas de usabilidad.",
    priceCLP: 120000,
  },
  {
    id: "redesign",
    name: "Rediseño y modernización de mi web actual",
    desc: "Transformamos tu sitio existente manteniendo tu contenido pero con estética moderna.",
    priceCLP: 80000,
  },
];

const selectedDesignLevel = ref(designLevels[1].id);

// PASO 3: Funcionalidades Adicionales (Selección múltiple)
const features = ref([
  {
    id: "payment",
    name: "Pasarela de Pago Online (Webpay / Mercado Pago / Stripe)",
    desc: "Cobros con tarjetas de crédito, débito y transferencias bancarias seguras.",
    priceCLP: 90000,
    selected: true,
    icon: IconCreditCard,
  },
  {
    id: "booking",
    name: "Sistema de Citas y Reservas Interactivo",
    desc: "Calendario en tiempo real con horarios hábiles y confirmaciones automáticas por correo.",
    priceCLP: 80000,
    selected: false,
    icon: IconCalendarEvent,
  },
  {
    id: "seo",
    name: "Optimización SEO Avanzada & Google Search Console",
    desc: "Estructura optimizada, metadatos enriquecidos y registro para posicionar en Google.",
    priceCLP: 60000,
    selected: true,
    icon: IconSearch,
  },
  {
    id: "hosting",
    name: "Configuración de Dominio .CL / .COM + Hosting Cloud",
    desc: "Despliegue en servidores ultra rápidos, certificado SSL (HTTPS) y correos corporativos.",
    priceCLP: 50000,
    selected: false,
    icon: IconServer,
  },
  {
    id: "whatsapp",
    name: "Widget de WhatsApp y Chat Flotante Directo",
    desc: "Botón interactivo en esquina para recibir consultas instantáneas a tu número.",
    priceCLP: 0,
    selected: true,
    icon: IconBrandWhatsapp,
    isFree: true,
  },
]);

// PASO 4: Velocidad de Entrega
const urgency = ref("standard"); // 'standard' o 'express'

// Cálculos
const currentProject = computed(() => {
  return (
    projectTypes.find((p) => p.id === selectedProjectType.value) ||
    projectTypes[0]
  );
});

const currentDesign = computed(() => {
  return (
    designLevels.find((d) => d.id === selectedDesignLevel.value) ||
    designLevels[0]
  );
});

const selectedFeatures = computed(() => {
  return features.value.filter((f) => f.selected);
});

const totalCLP = computed(() => {
  let total = currentProject.value.priceCLP + currentDesign.value.priceCLP;

  selectedFeatures.value.forEach((f) => {
    total += f.priceCLP;
  });

  if (urgency.value === "express") {
    total = Math.round(total * 1.2); // Recargo prioritario del 20%
  }

  return total;
});

const estimatedDelivery = computed(() => {
  if (urgency.value === "express") {
    return "1 a 2 semanas (Entrega Prioritaria Exprés)";
  }
  return currentProject.value.timeWeeks;
});

const resetCalculator = () => {
  selectedProjectType.value = projectTypes[1].id;
  selectedDesignLevel.value = designLevels[1].id;
  features.value.forEach((f) => {
    if (f.id === "payment" || f.id === "seo" || f.id === "whatsapp") {
      f.selected = true;
    } else {
      f.selected = false;
    }
  });
  urgency.value = "standard";
};

// Acciones de conversión
const bookAppointmentWithQuote = () => {
  const summary = [
    `Cotización: ${currentProject.value.name}`,
    `Diseño: ${currentDesign.value.name}`,
    `Funciones: ${selectedFeatures.value.map((f) => f.name).join(", ")}`,
    `Total Estimado: ${formatPrice(totalCLP.value)} (${estimatedDelivery.value})`,
  ].join(" | ");

  const query = new URLSearchParams({
    service: currentProject.value.name,
    budget: formatPrice(totalCLP.value),
    notes: `Cotización generada en web: ${summary}`,
  }).toString();

  window.open(`/booking?${query}`, "_blank");
};

const sendWhatsappQuote = () => {
  const lines = [
    "¡Hola Daniel! Estuve usando el cotizador online de MisiDev y me gustaría conversar sobre este proyecto:",
    `*Proyecto:* ${currentProject.value.name}`,
    `*Diseño:* ${currentDesign.value.name}`,
    `*Funciones adicionales:* ${selectedFeatures.value.map((f) => f.name).join(", ")}`,
    `*Plazo deseado:* ${estimatedDelivery.value}`,
    `*Presupuesto Estimado:* ${formatPrice(totalCLP.value)}`,
    "",
    "¿Podemos agendar una reunión o revisar la factibilidad técnica?",
  ];

  const message = encodeURIComponent(lines.join("\n"));
  window.open(`https://wa.me/56962857073?text=${message}`, "_blank");
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4 py-8">
    <!-- Header del Cotizador -->
    <div
      class="text-center max-w-3xl mx-auto mb-10"
      data-aos="fade-down"
      data-aos-duration="700"
    >
      <text-h-2-pages-components class="text-[#2E5A8F]">
        Calcula el Presupuesto
      </text-h-2-pages-components>
      <paragraph-page-components class="pt-3 md:pt-4 lg:pt-6 text-[#5C6F91]">
        Selecciona las opciones que mejor se adapten a tu negocio y obtén un
        estimado claro y transparente en tiempo real. Sin costos ocultos.
      </paragraph-page-components>

      <!-- Selector de Moneda -->
      <div
        class="mt-5 inline-flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200"
      >
        <button
          @click="currency = 'CLP'"
          :class="[
            'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer',
            currency === 'CLP'
              ? 'bg-[#1D4580] text-white shadow-md'
              : 'text-gray-600 hover:text-black',
          ]"
        >
          <IconCurrencyDollar class="w-4 h-4 shrink-0" />
          <span>Peso Chileno (CLP)</span>
        </button>
        <button
          @click="currency = 'USD'"
          :class="[
            'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer',
            currency === 'USD'
              ? 'bg-[#1D4580] text-white shadow-md'
              : 'text-gray-600 hover:text-black',
          ]"
        >
          <IconWorld class="w-4 h-4 shrink-0" />
          <span>Dólares (USD)</span>
        </button>
      </div>
    </div>

    <!-- Layout en 2 Columnas: Formulario Interactivo (Izquierda) + Resumen Fijo (Derecha) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Columna Izquierda: Opciones paso a paso (8 cols) -->
      <div class="lg:col-span-7 xl:col-span-8 space-y-8 text-left">
        <!-- PASO 1: Tipo de Proyecto -->
        <div
          class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md"
          data-aos="fade-up"
        >
          <div class="flex items-center gap-3 mb-5">
            <span
              class="w-8 h-8 rounded-full bg-[#1D4580] text-white font-bold flex items-center justify-center text-sm"
            >
              1
            </span>
            <h3
              class="font-primary text-xl sm:text-2xl font-bold text-[#1D4580]"
            >
              ¿Qué tipo de proyecto deseas construir?
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="p in projectTypes"
              :key="p.id"
              @click="selectedProjectType = p.id"
              :class="[
                'p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group',
                selectedProjectType === p.id
                  ? 'border-[#FF6D2A] bg-orange-50/40 shadow-md scale-[1.02]'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm',
              ]"
            >
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div
                    :class="[
                      'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                      selectedProjectType === p.id
                        ? 'bg-[#FF6D2A] text-white'
                        : 'bg-[#1D4580]/5 text-[#1D4580]',
                    ]"
                  >
                    <component :is="p.icon" class="w-5 h-5" />
                  </div>
                  <span class="text-xs font-bold text-gray-400">
                    {{ p.timeWeeks }}
                  </span>
                </div>

                <h4
                  class="font-bold text-base text-[#1D4580] font-primary mb-1"
                >
                  {{ p.name }}
                </h4>
                <p
                  class="text-xs text-gray-500 font-secondary leading-relaxed mb-3"
                >
                  {{ p.desc }}
                </p>
              </div>

              <div
                class="pt-3 border-t border-gray-100 flex items-center justify-between"
              >
                <span class="text-xs text-gray-400 font-secondary">Desde:</span>
                <span class="font-bold text-sm text-[#FF6D2A]">
                  {{ formatPrice(p.priceCLP) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- PASO 2: Diseño UI/UX en Figma -->
        <div
          class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="flex items-center gap-3 mb-5">
            <span
              class="w-8 h-8 rounded-full bg-[#1D4580] text-white font-bold flex items-center justify-center text-sm"
            >
              2
            </span>
            <h3
              class="font-primary text-xl sm:text-2xl font-bold text-[#1D4580]"
            >
              Diseño y Prototipado UX/UI en Figma
            </h3>
          </div>

          <div class="space-y-3">
            <div
              v-for="d in designLevels"
              :key="d.id"
              @click="selectedDesignLevel = d.id"
              :class="[
                'p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4',
                selectedDesignLevel === d.id
                  ? 'border-[#FF6D2A] bg-orange-50/40 shadow-md'
                  : 'border-gray-100 bg-white hover:border-gray-200',
              ]"
            >
              <div class="flex items-start gap-3.5">
                <div
                  :class="[
                    'w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors',
                    selectedDesignLevel === d.id
                      ? 'border-[#FF6D2A] bg-[#FF6D2A]'
                      : 'border-gray-300 bg-white',
                  ]"
                >
                  <IconCheck
                    v-if="selectedDesignLevel === d.id"
                    class="w-3.5 h-3.5 text-white"
                  />
                </div>
                <div>
                  <h4
                    class="font-bold text-sm sm:text-base text-[#1D4580] font-primary"
                  >
                    {{ d.name }}
                  </h4>
                  <p class="text-xs text-gray-500 font-secondary mt-0.5">
                    {{ d.desc }}
                  </p>
                </div>
              </div>

              <div class="text-right shrink-0">
                <span
                  :class="[
                    'font-bold text-sm',
                    d.priceCLP === 0 ? 'text-emerald-600' : 'text-[#FF6D2A]',
                  ]"
                >
                  {{
                    d.priceCLP === 0
                      ? "Incluido"
                      : `+${formatPrice(d.priceCLP)}`
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- PASO 3: Funcionalidades Especiales -->
        <div
          class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="flex items-center gap-3 mb-2">
            <span
              class="w-8 h-8 rounded-full bg-[#1D4580] text-white font-bold flex items-center justify-center text-sm"
            >
              3
            </span>
            <h3
              class="font-primary text-xl sm:text-2xl font-bold text-[#1D4580]"
            >
              Funcionalidades e Integraciones Adicionales
            </h3>
          </div>
          <p class="text-xs text-gray-500 font-secondary ml-11 mb-5">
            Selecciona los complementos que necesitará tu plataforma para
            operar.
          </p>

          <div class="space-y-3">
            <div
              v-for="feat in features"
              :key="feat.id"
              @click="feat.selected = !feat.selected"
              :class="[
                'p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 select-none',
                feat.selected
                  ? 'border-[#1D4580] bg-[#1D4580]/5 shadow-sm'
                  : 'border-gray-100 bg-white hover:border-gray-200',
              ]"
            >
              <div class="flex items-center gap-3">
                <div
                  :class="[
                    'w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors',
                    feat.selected
                      ? 'border-[#1D4580] bg-[#1D4580]'
                      : 'border-gray-300 bg-white',
                  ]"
                >
                  <IconCheck v-if="feat.selected" class="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4
                    class="font-bold text-xs sm:text-sm text-[#1D4580] font-primary flex items-center gap-2"
                  >
                    <span>{{ feat.name }}</span>
                    <span
                      v-if="feat.isFree"
                      class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
                    >
                      Gratis
                    </span>
                  </h4>
                  <p class="text-xs text-gray-500 font-secondary">
                    {{ feat.desc }}
                  </p>
                </div>
              </div>

              <div class="text-right shrink-0">
                <span
                  :class="[
                    'font-bold text-xs sm:text-sm',
                    feat.priceCLP === 0 ? 'text-emerald-600' : 'text-[#1D4580]',
                  ]"
                >
                  {{
                    feat.priceCLP === 0
                      ? "Gratis"
                      : `+${formatPrice(feat.priceCLP)}`
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- PASO 4: Velocidad de Entrega -->
        <div
          class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div class="flex items-center gap-3 mb-5">
            <span
              class="w-8 h-8 rounded-full bg-[#1D4580] text-white font-bold flex items-center justify-center text-sm"
            >
              4
            </span>
            <h3
              class="font-primary text-xl sm:text-2xl font-bold text-[#1D4580]"
            >
              ¿Con qué urgencia requieres el proyecto?
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              @click="urgency = 'standard'"
              :class="[
                'p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between',
                urgency === 'standard'
                  ? 'border-[#1D4580] bg-[#1D4580]/5 shadow-md'
                  : 'border-gray-100 bg-white hover:border-gray-200',
              ]"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="font-bold text-[#1D4580] font-primary"
                    >Plazo Estándar</span
                  >
                  <IconClock class="w-5 h-5 text-[#1D4580]" />
                </div>
                <p class="text-xs text-gray-500 font-secondary">
                  Desarrollo ordenado según cronograma regular ({{
                    currentProject.timeWeeks
                  }}).
                </p>
              </div>
              <span class="text-xs font-bold text-emerald-600 mt-3"
                >Sin recargo</span
              >
            </div>

            <div
              @click="urgency = 'express'"
              :class="[
                'p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between',
                urgency === 'express'
                  ? 'border-[#FF6D2A] bg-orange-50/40 shadow-md'
                  : 'border-gray-100 bg-white hover:border-gray-200',
              ]"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="font-bold text-[#FF6D2A] font-primary flex items-center gap-1.5"
                  >
                    <span>Prioritario / Exprés</span>
                    <IconSparkles class="w-4 h-4" />
                  </span>
                  <IconRocket class="w-5 h-5 text-[#FF6D2A]" />
                </div>
                <p class="text-xs text-gray-500 font-secondary">
                  Dedicación exclusiva intensiva (1 a 2 semanas).
                </p>
              </div>
              <span class="text-xs font-bold text-[#FF6D2A] mt-3"
                >+20% de prioridad</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Tarjeta de Presupuesto Resumen Sticky (4 cols) -->
      <div class="lg:col-span-5 xl:col-span-4 sticky top-6 text-left">
        <div
          class="bg-linear-to-b from-[#1D4580] to-[#063F5C] rounded-4xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden"
        >
          <!-- Decoración luminosa -->
          <div
            class="absolute -top-16 -right-16 w-48 h-48 bg-[#FF6D2A]/20 rounded-full blur-2xl pointer-events-none"
          ></div>

          <!-- Encabezado del Resumen -->
          <div
            class="flex items-center justify-between pb-4 border-b border-white/15 mb-5"
          >
            <span
              class="text-xs font-bold text-[#FFB446] uppercase tracking-wider"
            >
              Resumen de Cotización
            </span>
            <button
              @click="resetCalculator"
              class="text-xs text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer transition"
              title="Reiniciar cotizador"
            >
              <IconRefresh class="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>

          <!-- Desglose de elementos seleccionados -->
          <div class="space-y-3.5 text-xs font-secondary mb-6">
            <!-- Proyecto base -->
            <div class="flex justify-between items-start">
              <div>
                <p class="font-bold text-white text-sm">
                  {{ currentProject.name }}
                </p>
                <p class="text-gray-300 text-[11px]">
                  Base técnica y arquitectura
                </p>
              </div>
              <span class="font-bold text-white shrink-0">
                {{ formatPrice(currentProject.priceCLP) }}
              </span>
            </div>

            <!-- Diseño -->
            <div class="flex justify-between items-start">
              <div>
                <p class="font-bold text-white">{{ currentDesign.name }}</p>
                <p class="text-gray-300 text-[11px]">Prototipado e identidad</p>
              </div>
              <span class="font-bold text-white shrink-0">
                {{
                  currentDesign.priceCLP === 0
                    ? "Incluido"
                    : formatPrice(currentDesign.priceCLP)
                }}
              </span>
            </div>

            <!-- Funcionalidades seleccionadas -->
            <div
              v-if="selectedFeatures.length > 0"
              class="pt-2 border-t border-white/10 space-y-1.5"
            >
              <p class="text-[11px] font-bold text-[#FFB446]">
                Funciones agregadas:
              </p>
              <div
                v-for="f in selectedFeatures"
                :key="f.id"
                class="flex justify-between text-[11px] text-gray-200"
              >
                <span class="truncate pr-2">• {{ f.name }}</span>
                <span class="shrink-0 font-medium">
                  {{ f.priceCLP === 0 ? "Gratis" : formatPrice(f.priceCLP) }}
                </span>
              </div>
            </div>

            <!-- Plazo estimado -->
            <div
              class="pt-3 border-t border-white/10 flex justify-between items-center text-xs"
            >
              <span class="text-gray-300 flex items-center gap-1">
                <IconClock class="w-3.5 h-3.5 text-[#FFB446]" />
                <span>Tiempo de Entrega:</span>
              </span>
              <span class="font-bold text-[#9FE7F5]">{{
                estimatedDelivery
              }}</span>
            </div>
          </div>

          <!-- Total Estimado Destacado -->
          <div class="bg-white/10 rounded-2xl p-4 mb-6 border border-white/15">
            <span class="text-xs text-gray-300 block mb-1"
              >Presupuesto Estimado:</span
            >
            <div class="flex items-baseline gap-2">
              <span
                class="text-3xl sm:text-4xl font-extrabold font-primary text-white tracking-tight"
              >
                {{ formatPrice(totalCLP) }}
              </span>
            </div>
            <p class="text-[10px] text-gray-300 mt-1 leading-snug">
              *Valor referencial para inicio de proyecto. En la reunión técnica
              ajustamos los detalles exactos.
            </p>
          </div>

          <!-- Botones de Acción de Conversión -->
          <div class="space-y-3">
            <button
              @click="bookAppointmentWithQuote"
              class="w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <IconCalendarEvent class="w-4 h-4" />
              <span>Agendar Reunión con este Presupuesto</span>
            </button>

            <button
              @click="sendWhatsappQuote"
              class="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm text-[#1D4580] bg-white hover:bg-gray-100 active:scale-95 transition shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <IconBrandWhatsapp class="w-4 h-4 text-[#25D366]" />
              <span>Consultar este Presupuesto por WhatsApp</span>
            </button>
          </div>

          <!-- Garantías -->
          <div
            class="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-gray-300 text-center"
          >
            <IconShieldCheck class="w-4 h-4 text-[#FFB446] shrink-0" />
            <span>3 Meses de Soporte Técnico Garantizado</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
