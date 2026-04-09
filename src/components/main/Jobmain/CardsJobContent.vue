<script setup>
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";

// Local data source for the 4 job cards.
const cards = [
  {
    id: 1,
    title: "Titulo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem non felis dignissim vestibulum at et lorem.",
    buttonText: "Button",
    iconText: "icon",
  },
  {
    id: 2,
    title: "Titulo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem non felis dignissim vestibulum at et lorem.",
    buttonText: "Button",
    iconText: "icon",
  },
  {
    id: 3,
    title: "Titulo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem non felis dignissim vestibulum at et lorem.",
    buttonText: "Button",
    iconText: "icon",
  },
  {
    id: 4,
    title: "Titulo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem non felis dignissim vestibulum at et lorem.",
    buttonText: "Button",
    iconText: "icon",
  },
];
</script>

<template>
  <!-- Responsive flex layout: 1 card on mobile, 2 on tablet/desktop -->
  <div class="flex flex-wrap justify-center gap-6 md:gap-8">
    <article
      v-for="card in cards"
      :key="card.id"
      class="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
    >
      <div
        class="rounded-4xl border-2 border-[#2E5A8F] bg-white py-10 px-5 lg:py-14 lg:px-8"
      >
        <!-- Keep the original icon element, only repositioned via wrapper -->
        <div class="h-16 w-16 m-auto">
          <div
            class="w-16 h-16 bg-[#2E5A8F] rounded-full flex items-center justify-center absolute shadow-lg"
          >
            <span class="text-white text-sm">{{ card.iconText }}</span>
          </div>
        </div>

        <div
          class="flex h-full flex-col items-center justify-between text-center pt-6 lg:pt-8"
        >
          <div class="space-y-3">
            <h3
              class="text-[#2E5A8F] text-2xl md:text-3xl lg:text-4xl font-bold mb-5 md:mb-6 lg:mb-7 font-primary"
            >
              {{ card.title }}
            </h3>
            <p
              class="text-[#5C6F91] text-xs sm:text-sm lg:text-base leading-relaxed grow font-medium font-secondary"
            >
              {{ card.description }}
            </p>
          </div>

          <!-- Keep the original button component; content is now dynamic -->
          <button-all-components>{{ card.buttonText }}</button-all-components>
        </div>
      </div>
    </article>
  </div>
</template>
