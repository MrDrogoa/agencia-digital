<script setup>
import Logo from "@/components/navbar/Logo.vue";
import Lists from "@/components/navbar/Lists.vue";
import ButtonContactComponents from "@/components/buttons/ButtonContactComponents.vue";
import VectorComponents from "@/components/VectorComponents.vue";
</script>

<template>
  <section class="max-w-325 mx-auto">
    <nav
      class="flex justify-between items-center pt-4 md:pt-6 lg:pt-8 px-4 xl:px-0 relative z-10"
    >
      <logo />
      <lists />
      <router-link to="/contact" class="hidden md:block">
        <button-contact-components>Contacto</button-contact-components>
      </router-link>
    </nav>
    <vector-components class="hidden md:block" />
  </section>
</template>
