<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Logo from "@/components/navbar/Logo.vue";
import Lists from "@/components/navbar/Lists.vue";
import ButtonContactComponents from "@/components/buttons/ButtonContactComponents.vue";
import ButtonContactSecComponents from "@/components/buttons/ButtonContactSecComponents.vue";

const route = useRoute();

// Detectar si estamos en Home o en otra vista
const navbarVariant = computed(() => {
  return route.path === "/" ? "home" : "secondary";
});
</script>

<template>
  <section class="max-w-325 mx-auto">
    <nav
      class="flex justify-between items-center pt-4 md:pt-6 lg:pt-8 px-4 xl:px-0 relative z-10"
    >
      <logo />
      <lists :variant="navbarVariant" />
      <router-link to="/contact" class="hidden md:block">
        <button-contact-components v-if="navbarVariant === 'home'"
          >Contacto</button-contact-components
        >
        <button-contact-sec-components v-else
          >Contacto</button-contact-sec-components
        >
      </router-link>
    </nav>
  </section>
</template>
