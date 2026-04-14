<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import image1 from "@/assets/carrusel/image-1.webp";
import {
  IconArrowBigRightFilled,
  IconArrowBigLeftFilled,
} from "@tabler/icons-vue";

const slides = ref(
  Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    image: image1,
    alt: `Slide ${index + 1}`,
  })),
);

const currentIndex = ref(0);
let autoPlayInterval = null;

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  }, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const restartAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  restartAutoPlay();
};

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? slides.value.length - 1 : currentIndex.value - 1;
  restartAutoPlay();
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <section class="w-full max-w-5xl mx-auto px-4 md:px-6">
    <div class="flex flex-col items-center">
      <transition
        mode="out-in"
        enter-active-class="transition-opacity duration-500 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-500 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div :key="slides[currentIndex].id" class="w-full flex justify-center">
          <img
            :src="slides[currentIndex].image"
            :alt="slides[currentIndex].alt"
            class="w-full max-w-4xl h-55 md:h-90 object-cover rounded-4xl"
          />
        </div>
      </transition>

      <div class="flex items-center justify-center gap-4 mt-5">
        <button
          @click="prevSlide"
          class="w-10 h-10 rounded-full bg-[#9FE7F5] cursor-pointer hover:bg-[#79d8eb] flex items-center justify-center transition-colors"
          aria-label="Slide anterior"
        >
          <icon-arrow-big-left-filled class="w-5 h-5 text-white" />
        </button>

        <button
          @click="nextSlide"
          class="w-10 h-10 rounded-full bg-[#9FE7F5] cursor-pointer hover:bg-[#79d8eb] flex items-center justify-center transition-colors"
          aria-label="Siguiente slide"
        >
          <icon-arrow-big-right-filled class="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  </section>
</template>
