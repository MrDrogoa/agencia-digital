<script setup>
import JobContent from "@/components/hero/job/JobContent.vue";
import jobImg from "@/components/hero/job/JobImg.vue";
</script>

<template>
  <div class="mt-8 md:mt-16 relative">
    <job-img />
    <job-content
      class="absolute bottom-4 lg:bottom-8 xl:bottom-10 left-4 lg:left-8 xl:left-10"
    />
  </div>
</template>
