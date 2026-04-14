<script setup>
import JobHero from "@/components/hero/job/JobHero.vue";
import CardsJobs from "@/components/main/Jobmain/CardsJobs.vue";
import CardsJobDoble from "@/components/main/Jobmain/CardsJobDoble.vue";
import JobCarrusel from "@/components/main/Jobmain/JobCarrusel.vue";
</script>

<template>
  <section class="max-w-325 mx-auto px-4 xl:px-0">
    <job-hero />
    <cards-jobs />
    <cards-job-doble />
    <job-carrusel />
  </section>
</template>
