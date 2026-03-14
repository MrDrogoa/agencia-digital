<script setup>
import { IconPhone } from "@tabler/icons-vue";
</script>

<template>
  <section
    class="flex mt-8 md:mt-16 bg-[#1D4580] items-center justify-center py-3 sm:py-4 lg:py-6 xl:py-7 gap-2"
  >
    <div>
      <icon-phone
        class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-13 xl:h-13 text-white"
      />
    </div>
    <div>
      <h2
        class="font-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white"
      >
        Titulo
      </h2>
    </div>
  </section>
</template>
