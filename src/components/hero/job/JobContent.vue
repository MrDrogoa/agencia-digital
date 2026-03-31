<script setup>
import TextH2PagesComponents from "@/components/font/TextH2PagesComponents.vue";
import ParagraphPageComponents from "@/components/font/ParagraphPageComponents.vue";
import ButtonAllComponents from "@/components/buttons/ButtonAllComponents.vue";
const contentParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar diam neque. Nulla eu iaculis orci. Morbi ut magna vel velit pellentesque.";
</script>

<template>
  <div>
    <section
      class="flex w-full flex-col gap-3 sm:flex-row justify-center items-center sm:justify-between px-4 sm:px-8 md:px-11 lg:px-13 xl:px-15"
    >
      <div class="flex flex-col items-center sm:items-start w-[60%]">
        <text-h-2-pages-components class="text-white">
          Titulo
        </text-h-2-pages-components>
        <button-all-components>Ver Detalles</button-all-components>
      </div>

      <div class="sm:w-2/3 md:w-[40%] sm:flex-1">
        <paragraph-page-components
          class="text-white w-full pt-2 sm:pt-0 text-center sm:text-start"
        >
          {{ contentParagraph }}
        </paragraph-page-components>
      </div>
    </section>
  </div>
</template>
