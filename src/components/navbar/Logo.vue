<script setup>
import Logo from "@/assets/logo.svg";
</script>

<template>
  <router-link to="/">
    <img :src="Logo" alt="Logo" class="w-20 sm:w-26 md:w-28 lg:w-30 rounded-2xl shadow-xs hover:opacity-90 transition" />
  </router-link>
</template>
