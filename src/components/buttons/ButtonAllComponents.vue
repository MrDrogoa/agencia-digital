<script setup>
import { computed, useAttrs } from "vue";

// No props by design — this component should be used as a child with slot content and optional attributes
const attrs = useAttrs();
const emit = defineEmits(["click"]);

const base =
  "btn-all relative cursor-pointer font-secondary bg-gradient-to-r from-[#FF6D2A] to-[#FFB446] transition-all duration-300 font-bold rounded-3xl px-4 py-2 md:px-6 lg:px-8 text-xs md:text-sm lg:text-base xl:text-lg text-white mt-2 md:mt-4 lg:mt-6 overflow-hidden";

const classes = computed(() => {
  const extra = attrs.class || "";
  const disabled =
    "disabled" in attrs || attrs.disabled
      ? " opacity-50 pointer-events-none"
      : "";
  return [base, extra, disabled];
});
</script>

<template>
  <!-- Use as a child: <ButtonComponents class="px-6">Ver mas</ButtonComponents> -->
  <button v-bind="attrs" :class="classes" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<style scoped>
@import "@/assets/css/buttons/all.css";
</style>
