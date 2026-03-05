<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ParagraphComponents from "@/components/font/ParagraphComponents.vue";

const stats = [
  { value: 30, prefix: "+", label: "Lorem ipsum" },
  { value: 150, prefix: "+", label: "Lorem ipsum" },
  { value: 100, prefix: "+", label: "Lorem ipsum" },
  { value: 10, prefix: "+", label: "Lorem ipsum" },
];

const animatedValues = ref(stats.map(() => 0));
const hasAnimated = ref(false);
const sectionRef = ref(null);

// Función de easing para aceleración y desaceleración
const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

// Función para animar el contador
const animateCounter = (index, targetValue, duration = 3000) => {
  const startTime = Date.now();
  const startValue = 0;

  const updateCounter = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Aplicar easing
    const easedProgress = easeInOutQuad(progress);
    const currentValue = Math.floor(
      startValue + (targetValue - startValue) * easedProgress,
    );

    animatedValues.value[index] = currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      animatedValues.value[index] = targetValue;
    }
  };

  requestAnimationFrame(updateCounter);
};

// Intersection Observer para detectar cuando el elemento es visible
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true;
          // Animar todos los contadores
          stats.forEach((stat, index) => {
            animateCounter(index, stat.value);
          });
        }
      });
    },
    {
      threshold: 0.3, // Se activa cuando el 30% del elemento es visible
    },
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value);
  }
});
</script>

<template>
  <section ref="sectionRef" class="pt-6 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16">
    <article class="flex flex-wrap justify-center items-center">
      <template v-for="(stat, index) in stats" :key="index">
        <!-- Contenedor del número y texto -->
        <div
          class="flex flex-col items-center justify-center px-6 md:px-8 lg:px-12 py-4 w-1/2 lg:w-1/5"
        >
          <h3
            class="font-primary text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B5B8A] mb-2"
          >
            {{ stat.prefix }}{{ animatedValues[index] }}
          </h3>
          <paragraph-components>
            {{ stat.label }}
          </paragraph-components>
        </div>

        <!-- Línea divisoria solo para desktop (4 columnas) -->
        <div
          v-if="index < stats.length - 1"
          class="h-24 w-0.5 bg-[#9FE7F5] hidden lg:block"
        ></div>
      </template>
    </article>
  </section>
</template>
