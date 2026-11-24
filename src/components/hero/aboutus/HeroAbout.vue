<script setup>
import AboutContent from "@/components/hero/aboutus/AboutContent.vue";
import AboutImg from "@/components/hero/aboutus/AboutImg.vue";
</script>

<template>
  <div class="mt-8 md:mt-16 relative overflow-hidden rounded-3xl">
    <about-img />
    <about-content
      class="absolute bottom-4 lg:bottom-8 xl:bottom-10 left-4 right-4 lg:left-8 lg:right-8 xl:left-10 xl:right-10"
    />
  </div>
</template>
