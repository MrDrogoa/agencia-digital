<script setup>
import { ref, computed, onMounted } from "vue";
import {
  IconLock,
  IconLockOpen,
  IconUser,
  IconCalendar,
  IconClock,
  IconMail,
  IconPhone,
  IconSearch,
  IconFilter,
  IconCheck,
  IconX,
  IconTrash,
  IconCalendarEvent,
  IconBrandWhatsapp,
  IconLogout,
  IconSparkles,
  IconTrendingUp,
  IconAlertCircle,
  IconRefresh,
  IconShieldCheck,
  IconShieldLock,
  IconKey,
  IconDeviceFloppy,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-vue";

const BASE_API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4002/api").replace(/\/+$/, "");
const API_BASE = `${BASE_API_URL}/admin`;

// Estado de autenticación
const token = ref(localStorage.getItem("misidev_admin_token") || "");
const isAuthenticated = computed(() => !!token.value);
const sessionMinutesLeft = ref(null);

// Formulario de login
const loginEmail = ref("");
const loginPassword = ref("");
const showLoginPass = ref(false);
const loginError = ref("");
const isLoggingIn = ref(false);
const lockCountdown = ref(0);

// Datos del panel
const appointments = ref([]);
const stats = ref(null);
const isLoading = ref(false);
const actionMessage = ref("");

// Filtros y Búsqueda
const searchQuery = ref("");
const selectedStatus = ref("all");

// Modal de Cambio de Contraseña
const showSecurityModal = ref(false);
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const changePassError = ref("");
const changePassSuccess = ref("");
const isChangingPass = ref(false);

// Iniciar sesión
const handleLogin = async () => {
  loginError.value = "";
  isLoggingIn.value = true;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      if (res.status === 429 && data.retryAfterSeconds) {
        startLockCountdown(data.retryAfterSeconds);
      }
      throw new Error(data.error || "Credenciales incorrectas.");
    }

    token.value = data.token;
    localStorage.setItem("misidev_admin_token", data.token);
    loginPassword.value = "";
    await verifyAndFetch();
  } catch (err) {
    loginError.value = err.message || "Error al conectar con el servidor.";
  } finally {
    isLoggingIn.value = false;
  }
};

// Temporizador visual si se bloquea por intentos fallidos
const startLockCountdown = (seconds) => {
  lockCountdown.value = seconds;
  const interval = setInterval(() => {
    lockCountdown.value -= 1;
    if (lockCountdown.value <= 0) {
      clearInterval(interval);
      loginError.value = "";
    }
  }, 1000);
};

// Cerrar sesión de forma segura
const handleLogout = () => {
  token.value = "";
  localStorage.removeItem("misidev_admin_token");
  appointments.value = [];
  stats.value = null;
  sessionMinutesLeft.value = null;
};

// Verificar validez del token y luego cargar datos
const verifyAndFetch = async () => {
  if (!token.value) return;

  try {
    const verifyRes = await fetch(`${API_BASE}/verify`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });

    if (verifyRes.status === 401) {
      handleLogout();
      loginError.value = "Tu sesión ha expirado o no es válida. Por favor, identifícate.";
      return;
    }

    const verifyData = await verifyRes.json();
    if (verifyData.success) {
      sessionMinutesLeft.value = verifyData.remainingMinutes;
      await fetchData();
    }
  } catch (err) {
    console.error("Error al verificar sesión:", err);
    handleLogout();
  }
};

// Cargar citas y estadísticas
const fetchData = async () => {
  if (!token.value) return;
  isLoading.value = true;

  try {
    const headers = { Authorization: `Bearer ${token.value}` };

    const [appRes, statsRes] = await Promise.all([
      fetch(`${API_BASE}/appointments`, { headers }),
      fetch(`${API_BASE}/stats`, { headers }),
    ]);

    if (appRes.status === 401 || statsRes.status === 401) {
      handleLogout();
      loginError.value = "Tu sesión ha caducado. Vuelve a iniciar sesión.";
      return;
    }

    const appData = await appRes.json();
    const statsData = await statsRes.json();

    if (appData.success) appointments.value = appData.appointments;
    if (statsData.success) stats.value = statsData.stats;
  } catch (err) {
    console.error("Error al cargar datos de admin:", err);
  } finally {
    isLoading.value = false;
  }
};

// Actualizar estado de una cita
const updateStatus = async (id, newStatus) => {
  try {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    showFeedback(`✓ Estado actualizado a '${newStatus}'`);
    await fetchData();
  } catch (err) {
    alert("Error al actualizar estado: " + err.message);
  }
};

// Eliminar cita con confirmación
const handleDelete = async (id, clientName) => {
  if (!confirm(`¿Estás seguro de eliminar la cita de "${clientName}"? Esta acción no se puede deshacer.`)) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token.value}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    showFeedback("✓ Cita eliminada correctamente del registro");
    await fetchData();
  } catch (err) {
    alert("Error al eliminar cita: " + err.message);
  }
};

// Cambiar contraseña de administrador
const handleChangePassword = async () => {
  changePassError.value = "";
  changePassSuccess.value = "";

  if (newPassword.value !== confirmPassword.value) {
    changePassError.value = "Las nuevas contraseñas no coinciden.";
    return;
  }

  if (newPassword.value.length < 6) {
    changePassError.value = "La nueva contraseña debe tener mínimo 6 caracteres.";
    return;
  }

  isChangingPass.value = true;
  try {
    const res = await fetch(`${API_BASE}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al actualizar contraseña.");

    changePassSuccess.value = data.message;
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
    showFeedback("✓ Contraseña de administrador actualizada exitosamente");
    setTimeout(() => {
      showSecurityModal.value = false;
      changePassSuccess.value = "";
    }, 2500);
  } catch (err) {
    changePassError.value = err.message;
  } finally {
    isChangingPass.value = false;
  }
};

// Notificación temporal
const showFeedback = (msg) => {
  actionMessage.value = msg;
  setTimeout(() => {
    actionMessage.value = "";
  }, 4000);
};

// Generador de Google Calendar URL para el admin
const getGcalUrl = (app) => {
  const cleanDate = app.date.replace(/-/g, "");
  const [h, m] = app.time.split(":").map(Number);
  const startStamp = `${cleanDate}T${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
  const endMinTotal = h * 60 + m + 45;
  const endH = Math.floor(endMinTotal / 60);
  const endM = endMinTotal % 60;
  const endStamp = `${cleanDate}T${String(endH).padStart(2, "0")}${String(endM).padStart(2, "0")}00`;
  const title = `Reunión de Proyecto MisiDev: ${app.name} (${app.service || "Asesoría"})`;
  const details = `Reunión estratégica MisiDev.\nCliente: ${app.name}\nCorreo: ${app.email}\nTel: ${app.phone}\nServicio: ${app.service}\nNotas: ${app.notes || ""}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStamp}/${endStamp}&details=${encodeURIComponent(details)}&location=${encodeURIComponent("Google Meet / Videollamada Online")}&add=${encodeURIComponent(app.email)}&ctz=America/Santiago`;
};

// Enlace directo a WhatsApp con el cliente
const getWhatsappUrl = (phone, name) => {
  const cleanPhone = (phone || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(`¡Hola ${name}! Te contacto de MisiDev Agencia Digital respecto a tu reunión agendada.`);
  return `https://wa.me/${cleanPhone}?text=${text}`;
};

// Citas filtradas
const filteredAppointments = computed(() => {
  return appointments.value.filter((app) => {
    const matchesStatus =
      selectedStatus.value === "all" || app.status === selectedStatus.value;
    const query = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (app.name && app.name.toLowerCase().includes(query)) ||
      (app.email && app.email.toLowerCase().includes(query)) ||
      (app.phone && app.phone.includes(query)) ||
      (app.service && app.service.toLowerCase().includes(query)) ||
      (app.date && app.date.includes(query)) ||
      (app.notes && app.notes.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });
});

onMounted(() => {
  if (isAuthenticated.value) {
    verifyAndFetch();
  }
});
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4 py-8">
    <!-- PANTALLA 1: FORMULARIO DE INICIO DE SESIÓN ADMIN PROTEGIDO -->
    <div
      v-if="!isAuthenticated"
      class="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-2xl text-left"
      data-aos="zoom-in"
    >
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#1D4580] to-[#063F5C] text-white flex items-center justify-center mb-6 shadow-md">
        <IconShieldLock class="w-8 h-8 text-[#FFB446]" />
      </div>

      <div class="flex items-center gap-2 mb-2">
        <h2 class="font-primary text-2xl sm:text-3xl font-extrabold text-[#1D4580]">
          Acceso Administrador
        </h2>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
          SSL / HMAC
        </span>
      </div>

      <p class="font-secondary text-xs sm:text-sm text-gray-500 mb-6">
        Portal restringido y encriptado para la dirección de MisiDev Agencia Digital.
      </p>

      <!-- Alerta de Bloqueo por Fuerza Bruta -->
      <div v-if="lockCountdown > 0" class="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold flex items-center gap-2">
        <IconShieldLock class="w-5 h-5 shrink-0 text-amber-600" />
        <div>
          <p class="font-bold">Acceso bloqueado por seguridad</p>
          <p class="text-[11px] text-amber-700">Podrás volver a intentar en {{ lockCountdown }} segundos.</p>
        </div>
      </div>

      <!-- Alerta de Error / Intentos restantes -->
      <div v-else-if="loginError" class="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
        <IconAlertCircle class="w-4 h-4 shrink-0" />
        <span>{{ loginError }}</span>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Correo de Administrador
          </label>
          <div class="relative">
            <input
              v-model="loginEmail"
              type="email"
              autocomplete="username"
              required
              class="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#FF6D2A] focus:bg-white transition"
              placeholder="correo@misidev.com"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Contraseña Maestra
          </label>
          <div class="relative">
            <input
              v-model="loginPassword"
              :type="showLoginPass ? 'text' : 'password'"
              autocomplete="current-password"
              required
              class="w-full px-4 py-3 pr-10 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#FF6D2A] focus:bg-white transition"
              placeholder="••••••••••••"
            />
            <button
              type="button"
              @click="showLoginPass = !showLoginPass"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <IconEye v-if="!showLoginPass" class="w-4 h-4" />
              <IconEyeOff v-else class="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoggingIn || lockCountdown > 0"
          class="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 active:scale-98 transition shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <IconLock class="w-4 h-4" />
          <span v-if="!isLoggingIn">Acceder al Panel Privado</span>
          <span v-else>Autenticando credenciales...</span>
        </button>

        <div class="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <IconShieldCheck class="w-4 h-4 text-emerald-500" />
          <span>Protección contra fuerza bruta y ataques por temporización activa</span>
        </div>
      </form>
    </div>

    <!-- PANTALLA 2: DASHBOARD COMPLETO DE ADMINISTRACIÓN SEGURO -->
    <div v-else class="space-y-8 text-left animate-in fade-in duration-300">
      <!-- Barra superior con bienvenida y logout -->
      <div class="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4 text-center md:text-left">
          <img
            src="/favicon.png"
            alt="MisiDev Logo"
            class="w-14 h-14 rounded-2xl shadow-md object-cover"
          />
          <div>
            <div class="flex items-center gap-2 justify-center md:justify-start">
              <h1 class="font-primary text-2xl font-extrabold text-[#1D4580]">
                Panel de Control MisiDev
              </h1>
              <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Autenticado
              </span>
            </div>
            <p class="font-secondary text-xs text-gray-500 mt-0.5">
              Administrador: <strong>picisdaniel2016@gmail.com</strong>
              <span v-if="sessionMinutesLeft" class="ml-2 text-gray-400">
                (Sesión activa: {{ Math.round(sessionMinutesLeft / 60) }}h restantes)
              </span>
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <!-- Botón de Seguridad / Cambiar Contraseña -->
          <button
            @click="showSecurityModal = true"
            class="px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Cambiar contraseña de administrador"
          >
            <IconKey class="w-4 h-4" />
            <span>Seguridad & Clave</span>
          </button>

          <!-- Botón Actualizar Citas -->
          <button
            @click="fetchData"
            :disabled="isLoading"
            class="px-4 py-2.5 rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            title="Recargar citas"
          >
            <IconRefresh :class="['w-4 h-4 text-gray-500', isLoading ? 'animate-spin' : '']" />
            <span>Actualizar</span>
          </button>

          <!-- Botón Cerrar Sesión -->
          <button
            @click="handleLogout"
            class="px-4 py-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <IconLogout class="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      <!-- Banner de Seguridad Informativo para Daniel -->
      <div class="bg-gradient-to-r from-[#063F5C] to-[#1D4580] rounded-3xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <IconShieldCheck class="w-6 h-6 text-[#9FE7F5]" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-white">Panel Blindado para Producción</h4>
            <p class="text-xs text-blue-100 mt-0.5">
              Rutas protegidas con tokens HMAC-SHA256, API privada sin exposición de datos de clientes, y rate-limiting anti-fuerza bruta.
            </p>
          </div>
        </div>
        <div class="shrink-0 flex items-center gap-2">
          <span class="text-[11px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-400/30">
            ✓ Rutas públicas deshabilitadas
          </span>
        </div>
      </div>

      <!-- Feedback Toast -->
      <div
        v-if="actionMessage"
        class="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-lg animate-in slide-in-from-top-2"
      >
        <div class="flex items-center gap-2">
          <IconCheck class="w-5 h-5" />
          <span>{{ actionMessage }}</span>
        </div>
        <button @click="actionMessage = ''" class="hover:opacity-75 cursor-pointer">
          <IconX class="w-4 h-4" />
        </button>
      </div>

      <!-- 4 Tarjetas de Métricas Rápidas -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4" v-if="stats">
        <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-gray-400 uppercase">Total Citas</span>
            <IconCalendar class="w-5 h-5 text-[#1D4580]" />
          </div>
          <p class="text-3xl font-extrabold text-[#1D4580] font-primary">
            {{ stats.total }}
          </p>
          <span class="text-[11px] text-gray-400 font-secondary">Registros históricos</span>
        </div>

        <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-gray-400 uppercase">Confirmadas</span>
            <IconCheck class="w-5 h-5 text-emerald-500" />
          </div>
          <p class="text-3xl font-extrabold text-emerald-600 font-primary">
            {{ stats.confirmed }}
          </p>
          <span class="text-[11px] text-gray-400 font-secondary">Pendientes de reunión</span>
        </div>

        <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-gray-400 uppercase">Citas Hoy</span>
            <IconClock class="w-5 h-5 text-[#FF6D2A]" />
          </div>
          <p class="text-3xl font-extrabold text-[#FF6D2A] font-primary">
            {{ stats.today }}
          </p>
          <span class="text-[11px] text-gray-400 font-secondary">Sesiones del día</span>
        </div>

        <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-gray-400 uppercase">Realizadas</span>
            <IconTrendingUp class="w-5 h-5 text-blue-500" />
          </div>
          <p class="text-3xl font-extrabold text-blue-600 font-primary">
            {{ stats.completed }}
          </p>
          <span class="text-[11px] text-gray-400 font-secondary">Reuniones exitosas</span>
        </div>
      </div>

      <!-- Barra de Filtros y Búsqueda -->
      <div class="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <!-- Buscador -->
        <div class="relative flex-1">
          <IconSearch class="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por cliente, correo, teléfono, fecha o servicio..."
            class="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF6D2A] focus:bg-white transition"
          />
        </div>

        <!-- Filtros por Estado -->
        <div class="flex flex-wrap items-center gap-1.5">
          <button
            @click="selectedStatus = 'all'"
            :class="[
              'px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer',
              selectedStatus === 'all'
                ? 'bg-[#1D4580] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            Todas ({{ appointments.length }})
          </button>
          <button
            @click="selectedStatus = 'confirmed'"
            :class="[
              'px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer',
              selectedStatus === 'confirmed'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            Confirmadas ({{ stats?.confirmed || 0 }})
          </button>
          <button
            @click="selectedStatus = 'completed'"
            :class="[
              'px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer',
              selectedStatus === 'completed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            Realizadas ({{ stats?.completed || 0 }})
          </button>
          <button
            @click="selectedStatus = 'cancelled'"
            :class="[
              'px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer',
              selectedStatus === 'cancelled'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            Canceladas ({{ stats?.cancelled || 0 }})
          </button>
        </div>
      </div>

      <!-- Listado de Citas -->
      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-primary text-lg font-bold text-[#1D4580] flex items-center gap-2">
            <span>Listado de Reuniones</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {{ filteredAppointments.length }} citas mostradas
            </span>
          </h3>
        </div>

        <div v-if="filteredAppointments.length === 0" class="p-12 text-center">
          <IconCalendar class="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p class="font-primary text-base font-bold text-gray-700">No se encontraron citas</p>
          <p class="text-xs text-gray-400 mt-1">Prueba cambiando el filtro o la búsqueda.</p>
        </div>

        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="app in filteredAppointments"
            :key="app.id"
            class="p-6 hover:bg-gray-50/70 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <!-- Columna Datos del Cliente y Reunión -->
            <div class="space-y-2 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-primary font-extrabold text-base text-[#1D4580]">
                  {{ app.name }}
                </span>
                <span
                  :class="[
                    'text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase',
                    app.status === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : app.status === 'completed'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700',
                  ]"
                >
                  {{
                    app.status === "confirmed"
                      ? "Confirmada"
                      : app.status === "completed"
                      ? "Realizada"
                      : "Cancelada"
                  }}
                </span>
                <span v-if="app.service" class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#1D4580]/10 text-[#1D4580]">
                  {{ app.service }}
                </span>
              </div>

              <!-- Fecha y Hora -->
              <div class="flex flex-wrap items-center gap-4 text-xs text-gray-600 font-medium">
                <span class="flex items-center gap-1 text-[#FF6D2A] font-bold">
                  <IconCalendar class="w-3.5 h-3.5" />
                  {{ app.date }}
                </span>
                <span class="flex items-center gap-1 font-bold text-gray-700">
                  <IconClock class="w-3.5 h-3.5 text-gray-400" />
                  {{ app.time }} hrs
                </span>
                <a
                  :href="`mailto:${app.email}`"
                  class="flex items-center gap-1 hover:text-[#1D4580] transition"
                  title="Enviar correo"
                >
                  <IconMail class="w-3.5 h-3.5 text-gray-400" />
                  {{ app.email }}
                </a>
                <a
                  :href="`tel:${app.phone}`"
                  class="flex items-center gap-1 hover:text-[#1D4580] transition"
                  title="Llamar"
                >
                  <IconPhone class="w-3.5 h-3.5 text-gray-400" />
                  {{ app.phone }}
                </a>
              </div>

              <!-- Notas / Cotización -->
              <div v-if="app.notes" class="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100 mt-1">
                <span class="font-bold text-gray-700">Notas / Requerimiento:</span> {{ app.notes }}
              </div>
            </div>

            <!-- Columna Acciones Rápidas -->
            <div class="flex flex-wrap items-center gap-2 shrink-0">
              <!-- Selector de Estado -->
              <select
                :value="app.status"
                @change="updateStatus(app.id, $event.target.value)"
                class="px-3 py-2 rounded-xl text-xs font-bold border border-gray-200 bg-white hover:border-[#1D4580] focus:outline-none transition cursor-pointer"
              >
                <option value="confirmed">Confirmada</option>
                <option value="completed">Realizada</option>
                <option value="cancelled">Cancelada</option>
              </select>

              <!-- Botón Contactar WhatsApp -->
              <a
                :href="getWhatsappUrl(app.phone, app.name)"
                target="_blank"
                rel="noopener noreferrer"
                class="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                title="Abrir chat en WhatsApp"
              >
                <IconBrandWhatsapp class="w-4 h-4" />
                <span class="hidden sm:inline">WhatsApp</span>
              </a>

              <!-- Botón Google Calendar -->
              <a
                :href="getGcalUrl(app)"
                target="_blank"
                rel="noopener noreferrer"
                class="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition flex items-center gap-1 border border-blue-200"
                title="Añadir reunión a Google Calendar"
              >
                <IconCalendarEvent class="w-4 h-4" />
                <span class="hidden sm:inline">Calendar</span>
              </a>

              <!-- Botón Eliminar -->
              <button
                @click="handleDelete(app.id, app.name)"
                class="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-600 transition cursor-pointer"
                title="Eliminar cita"
              >
                <IconTrash class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE CAMBIO DE CONTRASEÑA Y SEGURIDAD -->
    <div
      v-if="showSecurityModal"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-left relative">
        <button
          @click="showSecurityModal = false"
          class="absolute right-5 top-5 text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer"
        >
          <IconX class="w-5 h-5" />
        </button>

        <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
          <IconKey class="w-6 h-6" />
        </div>

        <h3 class="font-primary text-xl font-extrabold text-[#1D4580]">
          Seguridad & Contraseña
        </h3>
        <p class="text-xs text-gray-500 mb-5">
          Actualiza la contraseña maestra del panel de control de MisiDev para el despliegue a producción.
        </p>

        <div v-if="changePassSuccess" class="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
          <IconCheck class="w-4 h-4 shrink-0" />
          <span>{{ changePassSuccess }}</span>
        </div>

        <div v-if="changePassError" class="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
          <IconAlertCircle class="w-4 h-4 shrink-0" />
          <span>{{ changePassError }}</span>
        </div>

        <form @submit.prevent="handleChangePassword" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">
              Contraseña Actual
            </label>
            <input
              v-model="currentPassword"
              type="password"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF6D2A]"
              placeholder="Ingresa tu contraseña actual"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">
              Nueva Contraseña (mínimo 6 caracteres)
            </label>
            <input
              v-model="newPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF6D2A]"
              placeholder="Nueva contraseña segura"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">
              Confirmar Nueva Contraseña
            </label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF6D2A]"
              placeholder="Repite la nueva contraseña"
            />
          </div>

          <div class="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              @click="showSecurityModal = false"
              class="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isChangingPass"
              class="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-linear-to-r from-[#FF6D2A] to-[#FFB446] hover:brightness-110 transition shadow-md cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <IconDeviceFloppy class="w-4 h-4" />
              <span v-if="!isChangingPass">Guardar Nueva Clave</span>
              <span v-else>Guardando...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
