<script setup>
import JobContent from "@/components/hero/job/JobContent.vue";
import jobImg from "@/components/hero/job/JobImg.vue";
</script>

<template>
  <div class="mt-8 md:mt-16 relative">
    <job-img />
    <div class="absolute inset-0 flex items-center">
      <job-content class="w-full" />
    </div>
  </div>
</template>
