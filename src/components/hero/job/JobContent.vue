<script setup>
import TextH2PagesComponents from "@/components/font/TextH2PagesComponents.vue";
import ParagraphPageComponents from "@/components/font/ParagraphPageComponents.vue";
</script>

<template>
  <div>
    <section class="flex justify-between">
      <div>
        <text-h-2-pages-components class="text-white">
          Titulo
        </text-h-2-pages-components>
      </div>

      <div>
        <paragraph-page-components
          class="text-white w-full sm:70 md:w-80 lg:w-100 xl:w-130 pt-2 sm:pt-3 md:pt-4 lg:pt-5"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          pulvinar diam neque.
        </paragraph-page-components>
      </div>
    </section>
  </div>
</template>
