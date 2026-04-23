<script setup>
import { RouterLink } from "vue-router";
import ButtonSingleComponents from "@/components/buttons/ButtonSingleComponents.vue";
import image from "@/assets/carrusel/image-1.webp";

const props = defineProps({
  cards: {
    type: Array,
    default: () => [
      {
        id: 1,
        title: "Titulo",
        image,
        buttonText: "Ver mas",
        to: "/success",
      },
      {
        id: 2,
        title: "Titulo",
        image,
        buttonText: "Ver mas",
        to: "/success",
      },
      {
        id: 3,
        title: "Titulo",
        image,
        buttonText: "Ver mas",
        to: "/success",
      },
      {
        id: 4,
        title: "Titulo",
        image,
        buttonText: "Ver mas",
        to: "/success",
      },
    ],
  },
});
</script>

<template>
  <div
    class="mx-auto mt-8 flex w-full max-w-6xl flex-wrap gap-4 px-4 md:gap-5 md:px-6"
  >
    <article
      v-for="card in props.cards"
      :key="card.id"
      class="w-full rounded-3xl bg-[#204A8A] p-4 md:w-[calc(50%-0.625rem)]"
    >
      <div class="relative h-48 overflow-hidden rounded-2xl sm:h-56">
        <img
          :src="card.image"
          :alt="card.title"
          class="h-full w-full object-cover"
        />

        <div
          class="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/60 via-black/20 to-transparent p-4"
        >
          <h3
            class="font-secondary text-3xl lg:text-4xl font-extrabold leading-none text-white"
          >
            {{ card.title }}
          </h3>

          <component
            :is="card.external ? 'a' : RouterLink"
            :href="card.external ? card.to : undefined"
            :to="!card.external ? card.to : undefined"
            :target="card.external ? '_blank' : undefined"
            :rel="card.external ? 'noopener noreferrer' : undefined"
            class="inline-flex w-fit"
          >
            <ButtonSingleComponents>
              {{ card.buttonText || "Ver mas" }}
            </ButtonSingleComponents>
          </component>
        </div>
      </div>
    </article>
  </div>
</template>
