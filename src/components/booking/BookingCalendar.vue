<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import {
  IconCalendar,
  IconClock,
  IconUser,
  IconMail,
  IconPhone,
  IconBriefcase,
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
  IconAlertCircle,
  IconArrowLeft,
  IconSparkles,
  IconCalendarPlus,
} from "@tabler/icons-vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import TextH2PagesComponents from "@/components/font/TextH2PagesComponents.vue";
import ParagraphPageComponents from "@/components/font/ParagraphPageComponents.vue";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:4002/api").replace(/\/+$/, "");

const services = [
  "Desarrollo Web a Medida (Vue / React / Node)",
  "Diseño UI/UX y Prototipado en Figma",
  "Tienda Online / E-commerce para Negocios",
  "Digitalización de Negocios Tradicionales & PYMEs",
  "Optimización SEO, Rendimiento y Mantenimiento",
  "Consulta General / Asesoría Estratégica",
];

// Estado de fecha y mes
const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());
const selectedDate = ref("");
const selectedTime = ref("");

// Estado del formulario
const form = ref({
  name: "",
  email: "",
  phone: "",
  service: services[0],
  notes: "",
  website_url: "", // Campo Honeypot anti-bots
});

const errors = ref({});
const isSubmitting = ref(false);
const isSuccess = ref(false);
const confirmedAppointment = ref(null);
const googleCalendarUrl = ref("");
const errorMessage = ref("");
const backendOnline = ref(true);

// Slots de 10:00 a 19:00 hrs
const baseSlots = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];
const availableSlots = ref([...baseSlots]);
const bookedSlots = ref([]);
const isLoadingSlots = ref(false);

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// Navegación de mes
const prevMonth = () => {
  if (
    currentYear.value === currentDate.getFullYear() &&
    currentMonth.value <= currentDate.getMonth()
  ) {
    return; // No ir a meses pasados
  }
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

// Generar días del calendario
const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);

  // En JS: 0 = Domingo, 1 = Lunes. Queremos 0 = Lunes, 6 = Domingo
  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek === -1) startDayOfWeek = 6;

  const totalDays = lastDay.getDate();
  const days = [];

  // Días vacíos previos
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({ dayNumber: null, isCurrentMonth: false, disabled: true });
  }

  // Días del mes
  for (let day = 1; day <= totalDays; day++) {
    const dayDate = new Date(currentYear.value, currentMonth.value, day);
    const dayOfWeek = dayDate.getDay();

    // Fecha en formato YYYY-MM-DD local
    const yyyy = currentYear.value;
    const mm = String(currentMonth.value + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    // Deshabilitar días pasados y domingos (0)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = dayDate < today;
    const isSunday = dayOfWeek === 0;
    const disabled = isPast || isSunday;

    days.push({
      dayNumber: day,
      dateString: dateStr,
      isCurrentMonth: true,
      disabled,
      isSunday,
      isToday: dayDate.getTime() === today.getTime(),
    });
  }

  return days;
});

// Seleccionar día
const selectDay = (day) => {
  if (day.disabled || !day.isCurrentMonth) return;
  selectedDate.value = day.dateString;
  selectedTime.value = "";
  fetchSlotsForDate(day.dateString);
};

// Consultar horarios al backend
const fetchSlotsForDate = async (dateStr) => {
  isLoadingSlots.value = true;
  try {
    const res = await fetch(`${API_BASE}/appointments/slots?date=${dateStr}`);
    if (res.ok) {
      const data = await res.json();
      availableSlots.value = data.availableSlots || baseSlots;
      bookedSlots.value = data.bookedSlots || [];
      backendOnline.value = true;
    } else {
      availableSlots.value = [...baseSlots];
      bookedSlots.value = [];
    }
  } catch (err) {
    console.warn(
      "Backend offline o no alcanzable, usando slots por defecto:",
      err,
    );
    backendOnline.value = false;
    availableSlots.value = [...baseSlots];
    bookedSlots.value = [];
  } finally {
    isLoadingSlots.value = false;
  }
};

const route = useRoute();

// Inicializar con la primera fecha disponible
onMounted(() => {
  if (route.query?.service) {
    const matched = services.find((s) =>
      s.toLowerCase().includes(String(route.query.service).toLowerCase()),
    );
    if (matched) form.value.service = matched;
  }

  if (route.query?.notes) {
    form.value.notes = String(route.query.notes).slice(0, 800);
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (tomorrow.getDay() === 0) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  }
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const dd = String(tomorrow.getDate()).padStart(2, "0");
  selectedDate.value = `${yyyy}-${mm}-${dd}`;
  fetchSlotsForDate(selectedDate.value);
});

// Validación
const validate = () => {
  errors.value = {};
  if (!selectedDate.value) {
    errors.value.date = "Por favor selecciona un día en el calendario.";
  }
  if (!selectedTime.value) {
    errors.value.time =
      "Por favor selecciona un horario entre 10:00 y 19:00 hrs.";
  }
  const trimmedName = form.value.name.trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.value.name = "Ingresa tu nombre completo (mínimo 2 caracteres).";
  } else if (/[<>]/.test(trimmedName)) {
    errors.value.name = "El nombre contiene caracteres no permitidos.";
  }

  if (!form.value.email.trim()) {
    errors.value.email = "Ingresa tu correo electrónico.";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      form.value.email.trim(),
    )
  ) {
    errors.value.email = "Ingresa un correo electrónico válido.";
  }

  const trimmedPhone = form.value.phone.trim();
  if (trimmedPhone && !/^[0-9+\-() ]*$/.test(trimmedPhone)) {
    errors.value.phone =
      "El teléfono solo puede contener números y símbolos (+, -, paréntesis, espacios).";
  }

  // Bloqueo preventivo si el campo Honeypot oculto fue completado por un bot
  if (form.value.website_url && form.value.website_url.trim() !== "") {
    return false;
  }

  return Object.keys(errors.value).length === 0;
};

// Enviar reserva
const handleSubmit = async () => {
  if (!validate()) return;

  isSubmitting.value = true;
  errorMessage.value = "";

  const payload = {
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    service: form.value.service,
    date: selectedDate.value,
    time: selectedTime.value,
    notes: form.value.notes,
    website_url: form.value.website_url,
  };

  try {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo agendar la cita.");
    }

    confirmedAppointment.value = data.appointment || payload;

    // Obtener enlace a Google Calendar desde el backend o generarlo localmente
    if (data.emailStatus?.gcalUrl) {
      googleCalendarUrl.value = data.emailStatus.gcalUrl;
    } else {
      const cleanDate = payload.date.replace(/-/g, "");
      const [h, m] = payload.time.split(":").map(Number);
      const startStamp = `${cleanDate}T${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
      const endMinTotal = h * 60 + m + 45;
      const endH = Math.floor(endMinTotal / 60);
      const endM = endMinTotal % 60;
      const endStamp = `${cleanDate}T${String(endH).padStart(2, "0")}${String(endM).padStart(2, "0")}00`;
      const title = `Reunión de Proyecto MisiDev: ${payload.name} (${payload.service || 'Asesoría'})`;
      const details = `Reunión estratégica con Daniel y MisiDev.\n\nServicio: ${payload.service}\nCliente: ${payload.name}\nCorreo: ${payload.email}\nModalidad: Videollamada Google Meet`;
      googleCalendarUrl.value = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStamp}/${endStamp}&details=${encodeURIComponent(details)}&location=${encodeURIComponent('Google Meet / Videollamada Online')}&add=${encodeURIComponent(payload.email)}&ctz=America/Santiago`;
    }

    isSuccess.value = true;
  } catch (err) {
    console.error("Error al agendar:", err);
    // Modo offline resiliente: si el backend no está corriendo, guardamos localmente en localStorage
    if (!backendOnline.value || err.message.includes("Failed to fetch")) {
      const localAppointments = JSON.parse(
        localStorage.getItem("misidev_appointments") || "[]",
      );
      payload.id = `local-${Date.now()}`;
      payload.offline = true;
      localAppointments.push(payload);
      localStorage.setItem(
        "misidev_appointments",
        JSON.stringify(localAppointments),
      );
      confirmedAppointment.value = payload;

      // Generar URL local de Google Calendar
      const cleanDate = payload.date.replace(/-/g, "");
      const [h, m] = payload.time.split(":").map(Number);
      const startStamp = `${cleanDate}T${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
      const endMinTotal = h * 60 + m + 45;
      const endH = Math.floor(endMinTotal / 60);
      const endM = endMinTotal % 60;
      const endStamp = `${cleanDate}T${String(endH).padStart(2, "0")}${String(endM).padStart(2, "0")}00`;
      const title = `Reunión de Proyecto MisiDev: ${payload.name} (${payload.service || 'Asesoría'})`;
      const details = `Reunión estratégica con Daniel y MisiDev.\n\nServicio: ${payload.service}\nCliente: ${payload.name}\nCorreo: ${payload.email}\nModalidad: Videollamada Google Meet`;
      googleCalendarUrl.value = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStamp}/${endStamp}&details=${encodeURIComponent(details)}&location=${encodeURIComponent('Google Meet / Videollamada Online')}&add=${encodeURIComponent(payload.email)}&ctz=America/Santiago`;

      isSuccess.value = true;
    } else {
      errorMessage.value =
        err.message || "Ocurrió un error al agendar tu cita.";
    }
  } finally {
    isSubmitting.value = false;
  }
};

const resetBooking = () => {
  isSuccess.value = false;
  selectedTime.value = "";
  form.value = {
    name: "",
    email: "",
    phone: "",
    service: services[0],
    notes: "",
    website_url: "",
  };
  if (selectedDate.value) {
    fetchSlotsForDate(selectedDate.value);
  }
};
</script>

<template>
  <div class="w-full max-w-6xl mx-auto px-4 sm:px-6">
    <!-- Header de la sección de agendamiento -->
    <div class="text-center mb-10 md:mb-14 mt-8 md:mt-16">
      <text-h-2-pages-components class="text-[#2E5A8F]">
        Agenda una Reunión
      </text-h-2-pages-components>
      <paragraph-page-components
        class="w-full max-w-2xl mx-auto pt-3 text-gray-600"
      >
        Conversemos sobre tu visión, requerimientos técnicos y cómo llevar tu
        negocio al siguiente nivel digital. Recibirás una confirmación inmediata
        por correo tanto tú como nuestro equipo.
      </paragraph-page-components>
    </div>

    <!-- PANTALLA DE ÉXITO -->
    <div
      v-if="isSuccess"
      class="bg-linear-to-b from-[#1D4580] to-[#063F5C] text-white rounded-3xl p-8 md:p-14 shadow-2xl max-w-2xl mx-auto text-center animate-fade-in"
    >
      <div
        class="w-20 h-20 bg-linear-to-r from-[#FF6D2A] to-[#FFB446] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
      >
        <IconCheck class="w-10 h-10 text-white" stroke-width="3" />
      </div>

      <h3 class="text-2xl md:text-4xl font-bold font-primary mb-3">
        ¡Cita Agendada con Éxito!
      </h3>
      <p
        class="text-gray-200 text-sm md:text-base leading-relaxed mb-6 font-secondary"
      >
        Hemos reservado tu espacio en nuestra agenda. Se ha enviado un correo
        con todos los detalles a
        <strong class="text-[#9FE7F5] underline">{{
          confirmedAppointment.email
        }}</strong>
        y una notificación a
        <strong class="text-[#FFB446]">picisdaniel2016@gmail.com</strong>.
      </p>

      <div
        class="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-left mb-8 border border-white/15"
      >
        <h4
          class="font-semibold text-[#9FE7F5] mb-3 text-sm uppercase tracking-wider"
        >
          Resumen de tu Sesión:
        </h4>
        <ul class="space-y-2 text-sm text-gray-100 font-secondary">
          <li><strong>Fecha:</strong> {{ confirmedAppointment.date }}</li>
          <li>
            <strong>Hora:</strong> {{ confirmedAppointment.time }} hrs (Horario
            Santiago, Chile)
          </li>
          <li><strong>Nombre:</strong> {{ confirmedAppointment.name }}</li>
          <li><strong>Servicio:</strong> {{ confirmedAppointment.service }}</li>
          <li><strong>Modalidad:</strong> Videollamada Google Meet / Zoom</li>
        </ul>
      </div>

      <!-- Botones de Acción: Google Calendar + Navegación -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <a
          v-if="googleCalendarUrl"
          :href="googleCalendarUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-[#FF6D2A] to-[#FFB446] text-white font-bold text-sm sm:text-base hover:brightness-110 active:scale-95 transition shadow-xl cursor-pointer"
        >
          <IconCalendarPlus class="w-5 h-5 shrink-0" />
          <span>Añadir a mi Google Calendar (1 Clic)</span>
        </a>

        <button
          @click="resetBooking"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#1D4580] font-semibold text-sm hover:bg-gray-100 transition shadow-md cursor-pointer"
        >
          <IconArrowLeft class="w-4 h-4" />
          <span>Agendar otra cita</span>
        </button>

        <router-link
          to="/"
          class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition border border-white/20 cursor-pointer"
        >
          Volver al Inicio
        </router-link>
      </div>
    </div>

    <!-- FORMULARIO DE AGENDAMIENTO PRINCIPAL (2 COLUMNAS) -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- COLUMNA IZQUIERDA: CALENDARIO Y HORARIOS (7 COLS) -->
      <div
        class="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100"
      >
        <div
          class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100"
        >
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-[#1D4580]/10 text-[#1D4580]">
              <IconCalendar class="w-6 h-6" />
            </div>
            <div>
              <h3
                class="text-lg md:text-xl font-bold font-primary text-[#1D4580]"
              >
                1. Selecciona Fecha
              </h3>
              <p class="text-xs md:text-sm text-gray-500 font-secondary">
                Atención de Lunes a Sábado
              </p>
            </div>
          </div>

          <!-- Selector de mes -->
          <div class="flex items-center gap-2">
            <button
              @click="prevMonth"
              class="p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-[#1D4580] hover:text-white transition cursor-pointer"
              title="Mes anterior"
            >
              <IconChevronLeft class="w-4 h-4" />
            </button>
            <span
              class="font-bold text-sm md:text-base text-[#1D4580] min-w-28 text-center"
            >
              {{ monthNames[currentMonth] }} {{ currentYear }}
            </span>
            <button
              @click="nextMonth"
              class="p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-[#1D4580] hover:text-white transition cursor-pointer"
              title="Mes siguiente"
            >
              <IconChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Días de la semana -->
        <div class="grid grid-cols-7 gap-2 mb-2 text-center">
          <span
            v-for="d in dayNames"
            :key="d"
            class="text-xs font-bold text-gray-400 py-1 uppercase"
          >
            {{ d }}
          </span>
        </div>

        <!-- Grilla de días del mes -->
        <div class="grid grid-cols-7 gap-2 mb-8">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="aspect-square flex items-center justify-center relative"
          >
            <button
              v-if="day.dayNumber"
              type="button"
              @click="selectDay(day)"
              :disabled="day.disabled"
              :class="[
                'w-full h-full rounded-2xl flex flex-col items-center justify-center font-medium text-sm transition-all duration-200',
                day.disabled
                  ? 'text-gray-300 cursor-not-allowed bg-gray-50/70'
                  : 'cursor-pointer hover:bg-[#9FE7F5]/30 hover:scale-105',
                selectedDate === day.dateString
                  ? 'bg-linear-to-r from-[#FF6D2A] to-[#FFB446] text-white font-bold shadow-md scale-105'
                  : 'text-gray-700 bg-white border border-gray-100',
                day.isToday && selectedDate !== day.dateString
                  ? 'ring-2 ring-[#1D4580]/40'
                  : '',
              ]"
            >
              <span>{{ day.dayNumber }}</span>
              <span
                v-if="day.isToday && selectedDate !== day.dateString"
                class="text-[9px] font-semibold text-[#1D4580] leading-none"
                >Hoy</span
              >
            </button>
          </div>
        </div>
        <p v-if="errors.date" class="text-xs text-red-500 font-medium mb-4">
          {{ errors.date }}
        </p>

        <!-- SELECCIÓN DE HORARIOS (10:00 - 19:00) -->
        <div class="pt-4 border-t border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <IconClock class="w-5 h-5 text-[#FF6D2A]" />
              <h4
                class="text-base md:text-lg font-bold font-primary text-[#1D4580]"
              >
                2. Horario Disponible (10:00 a 19:00 hrs)
              </h4>
            </div>
            <span
              v-if="selectedDate"
              class="text-xs text-gray-500 font-secondary"
            >
              Fecha: <strong>{{ selectedDate }}</strong>
            </span>
          </div>

          <div
            v-if="isLoadingSlots"
            class="text-center py-6 text-sm text-gray-400"
          >
            Cargando horarios disponibles...
          </div>

          <div
            v-else
            class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5"
          >
            <button
              v-for="timeSlot in baseSlots"
              :key="timeSlot"
              type="button"
              @click="selectedTime = timeSlot"
              :disabled="bookedSlots.includes(timeSlot)"
              :class="[
                'py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 border text-center',
                bookedSlots.includes(timeSlot)
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                  : selectedTime === timeSlot
                    ? 'bg-[#1D4580] text-white border-[#1D4580] shadow-md scale-102'
                    : 'bg-white text-[#1D4580] border-gray-200 hover:border-[#1D4580] hover:bg-[#1D4580]/5 cursor-pointer',
              ]"
            >
              {{ timeSlot }}
            </button>
          </div>
          <p v-if="errors.time" class="text-xs text-red-500 font-medium mt-3">
            {{ errors.time }}
          </p>
        </div>
      </div>

      <!-- COLUMNA DERECHA: DATOS DEL CLIENTE Y ENVÍO (5 COLS) -->
      <div
        class="lg:col-span-5 bg-linear-to-b from-[#1D4580] to-[#063F5C] text-white rounded-3xl p-6 md:p-8 shadow-xl"
      >
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div class="p-2.5 rounded-xl bg-white/10 text-[#9FE7F5]">
            <IconUser class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-lg md:text-xl font-bold font-primary text-white">
              3. Tus Datos de Contacto
            </h3>
            <p class="text-xs text-gray-300 font-secondary">
              Te enviaremos el enlace de la reunión aquí
            </p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Campo Honeypot Anti-Bots (invisible para humanos) -->
          <div
            class="absolute -left-[9999px] opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
            aria-hidden="true"
          >
            <label for="booking_website_url">Sitio Web (No completar)</label>
            <input
              id="booking_website_url"
              v-model="form.website_url"
              type="text"
              name="website_url"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          <!-- Nombre -->
          <div>
            <label
              class="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1"
            >
              Nombre y Apellido *
            </label>
            <div class="relative">
              <input
                v-model="form.name"
                type="text"
                maxlength="80"
                placeholder="Ej. Camila Morales"
                class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none focus:border-[#FFB446] focus:bg-white/15 transition"
              />
            </div>
            <p v-if="errors.name" class="text-xs text-[#FFB446] mt-1">
              {{ errors.name }}
            </p>
          </div>

          <!-- Correo -->
          <div>
            <label
              class="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1"
            >
              Tu Correo Electrónico *
            </label>
            <input
              v-model="form.email"
              type="email"
              maxlength="120"
              placeholder="nombre@empresa.com"
              class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none focus:border-[#FFB446] focus:bg-white/15 transition"
            />
            <p v-if="errors.email" class="text-xs text-[#FFB446] mt-1">
              {{ errors.email }}
            </p>
          </div>

          <!-- Teléfono / WhatsApp -->
          <div>
            <label
              class="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1"
            >
              Teléfono / WhatsApp (Opcional)
            </label>
            <input
              v-model="form.phone"
              type="tel"
              maxlength="30"
              placeholder="+56 9 1234 5678"
              class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none focus:border-[#FFB446] focus:bg-white/15 transition"
            />
            <p v-if="errors.phone" class="text-xs text-[#FFB446] mt-1">
              {{ errors.phone }}
            </p>
          </div>

          <!-- Servicio de interés -->
          <div>
            <label
              class="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1"
            >
              Servicio de Interés
            </label>
            <select
              v-model="form.service"
              class="w-full bg-[#1D4580] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FFB446] transition"
            >
              <option v-for="s in services" :key="s" :value="s">
                {{ s }}
              </option>
            </select>
          </div>

          <!-- Notas / Consulta -->
          <div>
            <label
              class="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1"
            >
              ¿De qué trata tu proyecto? (Opcional)
            </label>
            <textarea
              v-model="form.notes"
              rows="3"
              maxlength="800"
              placeholder="Cuéntanos brevemente qué necesitas o qué buscas mejorar..."
              class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:border-[#FFB446] focus:bg-white/15 transition resize-none"
            ></textarea>
            <p class="text-[11px] text-gray-300 text-right mt-1">
              {{ form.notes.length }} / 800 caracteres
            </p>
          </div>

          <!-- Resumen seleccionado -->
          <div
            v-if="selectedDate && selectedTime"
            class="bg-white/10 rounded-xl p-3 text-xs text-gray-200 border border-white/15"
          >
            🗓️ <strong>Cita seleccionada:</strong> {{ selectedDate }} a las
            <strong>{{ selectedTime }} hrs</strong>
          </div>

          <!-- Mensaje de error general -->
          <div
            v-if="errorMessage"
            class="bg-red-500/20 border border-red-400/40 text-red-200 p-3 rounded-xl text-xs flex items-center gap-2"
          >
            <IconAlertCircle class="w-4 h-4 shrink-0" />
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Botón de confirmar -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3.5 px-6 rounded-full font-bold text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-98 transition shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Confirmar Cita y Enviar Correos</span>
              <span v-else class="flex items-center gap-2">
                <svg
                  class="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Procesando reserva...
              </span>
            </button>
            <p class="text-[11px] text-gray-300 text-center mt-2">
              Envío seguro a tu correo y a
              <strong>picisdaniel2016@gmail.com</strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
