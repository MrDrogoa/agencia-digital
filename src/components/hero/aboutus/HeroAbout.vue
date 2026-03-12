<script setup>
import AboutContent from "@/components/hero/aboutus/AboutContent.vue";
import AboutImg from "@/components/hero/aboutus/Aboutimg.vue";
</script>

<template>
  <div class="mt-8 md:mt-16 relative">
    <about-img />
    <about-content
      class="absolute bottom-4 lg:bottom-8 xl:bottom-10 left-4 lg:left-8 xl:left-10"
    />
  </div>
</template>
