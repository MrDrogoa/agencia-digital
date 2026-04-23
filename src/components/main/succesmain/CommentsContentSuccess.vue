<script setup>
import avatar from "@/assets/success/avatar.webp";
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";

const props = defineProps({
  comments: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: "Nombre",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
        img: avatar,
      },
      {
        id: 2,
        name: "Nombre",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
        img: avatar,
      },
      {
        id: 3,
        name: "Nombre",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
        img: avatar,
      },
      {
        id: 4,
        name: "Nombre",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
        img: avatar,
      },
      {
        id: 5,
        name: "Nombre",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
        img: avatar,
      },
      {
        id: 6,
        name: "Nombre",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
        img: avatar,
      },
      {
        id: 7,
        name: "Nombre",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
        img: avatar,
      },
      {
        id: 8,
        name: "Nombre",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
        img: avatar,
      },
    ],
  },
});
</script>

<template>
  <div
    class="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-2 md:px-6"
  >
    <article
      v-for="comments in props.comments"
      :key="comments.id"
      class="flex items-center gap-4 rounded-3xl bg-white p-4 md:p-6 shadow-md"
    >
      <div class="min-w-0 flex-1">
        <h3
          class="text-[#2E5A8F] text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 font-primary"
        >
          {{ comments.name }}
        </h3>
        <paragraph-components>
          {{ comments.comment }}
        </paragraph-components>
      </div>

      <div class="shrink-0">
        <img
          :src="comments.img"
          :alt="comments.name"
          class="h-14 w-14 rounded-full object-cover"
        />
      </div>
    </article>
  </div>
</template>
