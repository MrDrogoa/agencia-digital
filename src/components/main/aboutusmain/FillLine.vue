<script setup>
import { IconPhone } from "@tabler/icons-vue";
</script>

<template>
  <section
    class="flex mt-8 md:mt-16 bg-[#1D4580] items-center justify-center py-3 sm:py-4 lg:py-6 xl:py-7 gap-2"
  >
    <router-link to="/contact">
      <div>
        <icon-phone
          class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-13 xl:h-13 text-white"
        />
      </div>
    </router-link>

    <div>
      <h2
        class="font-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white"
      >
        ¿Comenzamos tu proyecto?
      </h2>
    </div>
  </section>
</template>
