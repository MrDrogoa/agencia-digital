<script setup>
import HeroImg from "@/components/hero/HeroImg.vue";
import HeroContent from "@/components/hero/HeroContent.vue";
</script>

<template>
  <section class="pt-8 sm:pt-11 md:pt-14 lg:pt-17 xl:pt-22">
    <article
      class="flex flex-col-reverse lg:flex-row items-center lg:justify-between gap-10 lg:gap-0"
    >
      <div class="lg:w-1/2">
        <hero-content />
      </div>
      <div class="lg:w-1/2 flex justify-center">
        <hero-img />
      </div>
    </article>
  </section>
</template>
