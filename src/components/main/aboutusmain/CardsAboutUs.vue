<script setup>
import { ref } from "vue";
import Card1 from "@/assets/card/cardaboutus/card-1.webp";
import Card2 from "@/assets/card/cardaboutus/card-2.webp";
import Card3 from "@/assets/card/cardaboutus/card-3.webp";
const cards = ref([
  {
    id: 1,
    image: Card1,
    title: "Medio\nAmbiente",
  },
  {
    id: 2,
    image: Card2,
    title: "Diversidad\nInclusión",
  },
  {
    id: 3,
    image: Card3,
    title: "Calidad",
  },
]);
</script>

<template>
  <div class="flex flex-col md:flex-row md:flex-nowrap justify-center gap-4">
    <div
      v-for="card in cards"
      :key="card.id"
      class="group relative w-full rounded-4xl overflow-hidden"
    >
      <img
        :src="card.image"
        :alt="card.title.replace('\n', ' ')"
        class="w-full h-90 xl:h-full object-cover"
      />

      <div class="absolute inset-0 bg-black/45"></div>

      <h3
        class="font-primary absolute inset-0 z-10 flex items-center justify-center text-center px-6 text-white font-extrabold text-3xl md:text-4xl xl:text-5xl"
        style="white-space: pre-line"
      >
        {{ card.title }}
      </h3>
    </div>
  </div>
</template>
