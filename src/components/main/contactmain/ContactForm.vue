<script setup>
import { reactive } from "vue";
import TextH2PagesComponents from "@/components/font/TextH2PagesComponents.vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";

const whatsappNumber = "56962857073";

const form = reactive({
  name: "",
  lastName: "",
  email: "",
  message: "",
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

  form.name = "";
  form.lastName = "";
  form.email = "";
  form.message = "";
  clearErrors();
};
</script>

<template>
  <div
    class="w-full rounded-[28px] bg-[#1D4580] p-6 text-white shadow-2xl md:p-10"
  >
    <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
      <text-h-2-pages-components class="text-center md:text-left">
        Titulo
      </text-h-2-pages-components>

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
