<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FloatingActions from "@/components/FloatingActions.vue";
</script>

<template>
  <section class="relative min-h-screen overflow-x-clip">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    <FloatingActions />
  </section>
</template>
