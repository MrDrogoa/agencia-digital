<script setup>
import TextH2PagesComponents from "@/components/font/TextH2PagesComponents.vue";
import ParagraphPageComponents from "@/components/font/ParagraphPageComponents.vue";
import {
  IconPhoneFilled,
  IconMailFilled,
  IconMessageFilled,
  IconCalendarEventFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-vue";

const props = defineProps({
  contact: {
    type: Object,
    default: () => ({
      id: 1,
      title: "Titulo",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar diam neque. Nulla eu iaculis orci. Morbi ut magna vel velit pellentesque.",
      icon: {
        phone: IconPhoneFilled,
        mail: IconMailFilled,
        message: IconMessageFilled,
        calendar: IconCalendarEventFilled,
        check: IconCircleCheckFilled,
      },
    }),
  },
});
</script>

<template>
  <div
    class="bg-linear-to-b from-[#419FBC] to-[#61BDBC] p-6 md:p-10 lg:p-14 rounded-3xl text-white flex flex-col items-center text-center"
  >
    <text-h-2-pages-components>{{
      props.contact.title
    }}</text-h-2-pages-components>
    <paragraph-page-components class="py-3 md:py-4 lg:py-6">{{
      props.contact.description
    }}</paragraph-page-components>

    <div class="flex gap-4 mt-auto">
      <div
        v-for="(icon, key) in props.contact.icon"
        :key="key"
        class="flex items-center gap-2"
      >
        <div class="bg-white rounded-xl p-2">
          <component :is="icon" class="text-[#1D4580] md:w-8 md:h-8" />
        </div>
      </div>
    </div>
  </div>
</template>
