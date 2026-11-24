<script setup>
import { ref, reactive } from "vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
import { IconCheck, IconBrandWhatsapp } from "@tabler/icons-vue";

const whatsappNumber = "56962857073";
const isSent = ref(false);

const form = reactive({
  name: "",
  lastName: "",
  email: "",
  message: "",
  website_url: "", // Campo Honeypot anti-bots
});

const errors = reactive({
  name: "",
  lastName: "",
  email: "",
  message: "",
});

const clearErrors = () => {
  errors.name = "";
  errors.lastName = "";
  errors.email = "";
  errors.message = "";
};

const validateForm = () => {
  clearErrors();

  let isValid = true;

  if (!form.name.trim()) {
    errors.name = "Ingresa tu nombre.";
    isValid = false;
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Ingresa tu apellido.";
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = "Ingresa tu correo.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Ingresa un correo válido.";
    isValid = false;
  }

  if (!form.message.trim()) {
    errors.message = "Escribe tu mensaje.";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  // Bloqueo silencioso si un bot rellenó el campo Honeypot oculto
  if (form.website_url && form.website_url.trim() !== "") {
    return;
  }

  if (!validateForm()) return;

  const message = [
    "Hola, me gustaría ponerme en contacto.",
    `Nombre: ${form.name}`,
    `Apellido: ${form.lastName}`,
    `Correo: ${form.email}`,
    `Mensaje: ${form.message}`,
  ].join("%0A");

  window.open(
    `https://wa.me/${whatsappNumber}?text=${message}`,
    "_blank",
    "noopener,noreferrer",
  );

  isSent.value = true;
  form.name = "";
  form.lastName = "";
  form.email = "";
  form.message = "";
  form.website_url = "";
  clearErrors();
};
</script>

<template>
  <div
    class="w-full rounded-[28px] bg-[#1D4580] p-6 text-white shadow-2xl md:p-10"
  >
    <div
      v-if="isSent"
      class="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-100 flex items-center gap-3 animate-in fade-in"
    >
      <div class="p-1 rounded-full bg-emerald-500 text-white shrink-0">
        <IconCheck class="w-5 h-5" />
      </div>
      <div class="text-xs sm:text-sm text-left">
        <p class="font-bold text-white">
          ¡Listo! Te redirigimos a WhatsApp con tu mensaje preparado.
        </p>
        <p class="text-emerald-200">
          Te responderemos a la brevedad para coordinar tu proyecto.
        </p>
      </div>
    </div>

    <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
      <!-- Campo Honeypot Anti-Bots (invisible para humanos) -->
      <div
        class="absolute -left-[9999px] opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label for="contact_website_url">Sitio Web (No completar)</label>
        <input
          id="contact_website_url"
          v-model="form.website_url"
          type="text"
          name="website_url"
          tabindex="-1"
          autocomplete="off"
        />
      </div>

      <h2
        class="text-center md:text-left font-primary text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4"
      >
        Escríbenos
      </h2>

      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-5 md:flex-row">
          <div class="flex-1">
            <label
              for="name"
              class="mb-2 block text-sm md:text-lg font-medium text-white/90 font-primary"
              >Nombre</label
            >
            <input
              id="name"
              v-model="form.name"
              type="text"
              maxlength="60"
              autocomplete="given-name"
              class="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#61BDBC] focus:ring-2 focus:ring-[#61BDBC]/40"
            />
            <p v-if="errors.name" class="mt-2 text-sm text-[#FFD3D3]">
              {{ errors.name }}
            </p>
          </div>

          <div class="flex-1">
            <label
              for="lastName"
              class="mb-2 block text-sm md:text-lg font-medium text-white/90 font-primary"
              >Apellido</label
            >
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              maxlength="60"
              autocomplete="family-name"
              class="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#61BDBC] focus:ring-2 focus:ring-[#61BDBC]/40"
            />
            <p
              v-if="errors.lastName"
              class="mt-2 text-sm text-[#FFD3D3] font-secondary"
            >
              {{ errors.lastName }}
            </p>
          </div>
        </div>

        <div>
          <label
            for="email"
            class="mb-2 block text-sm md:text-lg font-medium text-white/90 font-primary"
            >Correo</label
          >
          <input
            id="email"
            v-model="form.email"
            type="email"
            maxlength="120"
            autocomplete="email"
            class="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#61BDBC] focus:ring-2 focus:ring-[#61BDBC]/40"
          />
          <p
            v-if="errors.email"
            class="mt-2 text-sm text-[#FFD3D3] font-secondary"
          >
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label
            for="message"
            class="mb-2 block text-sm md:text-lg font-medium text-white/90 font-primary"
            >Mensaje</label
          >
          <textarea
            id="message"
            v-model="form.message"
            rows="6"
            maxlength="600"
            class="w-full resize-none rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#61BDBC] focus:ring-2 focus:ring-[#61BDBC]/40"
          ></textarea>
          <p
            v-if="errors.message"
            class="mt-2 text-sm text-[#FFD3D3] font-secondary"
          >
            {{ errors.message }}
          </p>
        </div>
      </div>

      <div class="pt-2">
        <ButtonAllComponents type="submit" class="w-full justify-center">
          Enviar
        </ButtonAllComponents>
      </div>
    </form>
  </div>
</template>
