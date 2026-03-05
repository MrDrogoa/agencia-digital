<script setup>
import { computed } from "vue";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandBehance,
  IconBrandLinkedin,
  IconCopyright,
} from "@tabler/icons-vue";
import logoFooter from "@/assets/logoFooter.svg";

const props = defineProps({
  companyName: {
    type: String,
    default: "MisiDev",
  },
  description: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id quam pretium.",
  },
  socialLinks: {
    type: Array,
    default: () => [
      { name: "Facebook", url: "#", icon: IconBrandFacebook },
      { name: "Instagram", url: "#", icon: IconBrandInstagram },
      { name: "Behance", url: "#", icon: IconBrandBehance },
      { name: "LinkedIn", url: "#", icon: IconBrandLinkedin },
    ],
  },
  columns: {
    type: Array,
    default: () => [
      {
        title: "Título",
        items: [
          { text: "Lorem ipsum", link: "#" },
          { text: "Lorem ipsum", link: "#" },
          { text: "Lorem ipsum", link: "#" },
          { text: "Lorem ipsum", link: "#" },
        ],
      },
      {
        title: "Título",
        items: [
          { text: "Lorem ipsum", link: "#" },
          { text: "Lorem ipsum", link: "#" },
          { text: "Lorem ipsum", link: "#" },
          { text: "Lorem ipsum", link: "#" },
        ],
      },
      {
        title: "Título",
        items: [
          { text: "Lorem ipsum", link: "#" },
          { text: "Lorem ipsum", link: "#" },
          { text: "Lorem ipsum", link: "#" },
          { text: "Lorem ipsum", link: "#" },
        ],
      },
    ],
  },
});

const logo = logoFooter;
const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="pt-8 md:pt-20 lg:pt-25 xl:pt-30">
    <section class="bg-linear-to-b from-[#1D4580] to-[#063F5C] text-white">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20 pb-8"
      >
        <!-- Main Footer Content -->
        <div
          class="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap gap-8 md:gap-12 mb-12"
        >
          <!-- Logo Section -->
          <div class="flex-1 min-w-62.5 xl:max-w-75">
            <router-link to="/">
              <img
                :src="logo"
                :alt="companyName"
                class="h-16 lg:h-25 w-auto mb-4"
              />
            </router-link>
            <p class="text-sm text-gray-300 font-medium mb-6 leading-relaxed">
              {{ description }}
            </p>

            <!-- Social Icons -->
            <div class="flex gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                :aria-label="social.name"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-white text-[#1D4580] flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <component :is="social.icon" class="w-7 h-7" />
              </a>
            </div>
          </div>

          <!-- Footer Columns -->
          <div
            v-for="(column, index) in columns"
            :key="index"
            class="flex-1 min-w-50"
          >
            <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
              {{ column.title }}
            </h3>
            <ul class="space-y-2">
              <li v-for="(item, itemIndex) in column.items" :key="itemIndex">
                <a
                  v-if="item.link"
                  :href="item.link"
                  class="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {{ item.text }}
                </a>
                <span v-else class="text-sm text-gray-300">
                  {{ item.text }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-px bg-white my-4"></div>
        <div class="hidden sm:block sm:w-90 h-px bg-white mb-6"></div>

        <!-- Copyright -->
        <div
          class="text-center text-sm text-gray-300 flex items-center justify-center"
        >
          <IconCopyright :size="16" class="inline-block mr-1" />

          <p>
            Copyright {{ currentYear }} | Desarrollado por {{ companyName }}
          </p>
        </div>
      </div>
    </section>
  </footer>
</template>
