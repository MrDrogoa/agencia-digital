<script setup>
import { computed, useAttrs } from "vue";

// No props by design — this component should be used as a child with slot content and optional attributes
const attrs = useAttrs();
const emit = defineEmits(["click"]);

const base =
  "btn-contact relative cursor-pointer font-secondary font-bold rounded-3xl px-4 py-2 md:px-6 lg:px-8 text-sm lg:text-base xl:text-lg border-2 border-[#1D4580] text-[#1D4580] transition-all duration-500 ease-in overflow-hidden z-1 inline-block";

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
  <!-- Use as a child: <ButtonContactComponents class="px-6">Contact Us</ButtonContactComponents> -->
  <button v-bind="attrs" :class="classes" @click="$emit('click', $event)">
    <span class="relative z-1 transition-colors duration-300">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
@import "@/assets/css/buttons/contactsec.css";
</style>
