<script setup>
import { IconMenu4, IconX } from "@tabler/icons-vue";
import ButtonContactComponents from "@/components/buttons/ButtonContactComponents.vue";
import { ref, computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "home", // 'home' or 'secondary'
    validator: (value) => ["home", "secondary"].includes(value),
  },
});

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const menuList = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/aboutus" },
  { name: "Trabajos", path: "/works" },
  { name: "Exitos", path: "/success" },
];

// Clases dinámicas según variant
const textClasses = computed(() => {
  return props.variant === "home" ? "text-white" : "text-[#1D4580]";
});

const hoverClasses = computed(() => {
  return props.variant === "home"
    ? "hover:bg-white hover:text-[#2E5A8F]"
    : "hover:bg-[#1D4580] hover:text-white";
});
</script>

<template>
  <section>
    <ul class="md:flex font-primary md:gap-2 lg:gap-5 hidden">
      <li
        v-for="item in menuList"
        :key="item.name"
        :class="[
          'nav-item md:text-sm lg:text-base xl:text-lg font-semibold transition-all duration-300',
          textClasses,
        ]"
      >
        <router-link
          :to="item.path"
          :class="[
            'relative inline-block py-3 px-5 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
            hoverClasses,
          ]"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>

    <!-- Ícono de menú hamburguesa para pantallas pequeñas -->
    <div class="block md:hidden">
      <IconMenu4
        v-if="!menuOpen"
        class="text-2xl cursor-pointer"
        @click="toggleMenu"
      />

      <IconX
        v-if="menuOpen"
        class="text-2xl cursor-pointer"
        @click="toggleMenu"
      />
    </div>

    <!-- Menú desplegable para dispositivos móviles -->
    <div
      v-if="menuOpen"
      class="md:hidden right-0 top-19 sm:top-23 absolute bg-[#1D4580] w-full shadow-lg z-10"
    >
      <ul
        class="flex flex-col items-center gap-6 py-4 font-secondary font-medium"
      >
        <li
          v-for="item in menuList"
          :key="item.name"
          class="text-sm sm:text-base font-semibold text-white"
        >
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
        <!-- Botón de contacto en menú móvil -->
        <div class="flex gap-2">
          <router-link to="/contact">
            <button-contact-components class="text-white"
              >Contacto</button-contact-components
            >
          </router-link>
        </div>
      </ul>
    </div>
  </section>
</template>
<style scoped>
@import "@/assets/css/hero/list.css";
</style>
