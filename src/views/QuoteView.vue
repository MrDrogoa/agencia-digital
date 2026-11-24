<script setup>
import BudgetCalculator from "@/components/calculator/BudgetCalculator.vue";
import { IconCheck, IconShieldLock, IconPhoneCall } from "@tabler/icons-vue";
</script>

<template>
  <section class="max-w-325 mx-auto px-4 xl:px-0">
    <BudgetCalculator />

    <!-- Bloque de confianza al final del cotizador -->
    <div
      data-aos="fade-up"
      data-aos-duration="700"
      class="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
    >
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div class="p-2.5 rounded-2xl bg-emerald-100 text-emerald-600 shrink-0">
          <IconCheck class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-bold text-sm text-[#1D4580] font-primary mb-1">
            Presupuesto 100% Transparente
          </h4>
          <p class="text-xs text-gray-500 font-secondary leading-relaxed">
            Sin costos sorpresa ni tarifas ocultas. Sabes exactamente qué estás pagando antes de iniciar.
          </p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div class="p-2.5 rounded-2xl bg-blue-100 text-[#1D4580] shrink-0">
          <IconPhoneCall class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-bold text-sm text-[#1D4580] font-primary mb-1">
            Asesoría Inicial Gratuita
          </h4>
          <p class="text-xs text-gray-500 font-secondary leading-relaxed">
            30 minutos de videollamada para analizar tu modelo de negocio y definir el alcance técnico.
          </p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div class="p-2.5 rounded-2xl bg-orange-100 text-[#FF6D2A] shrink-0">
          <IconShieldLock class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-bold text-sm text-[#1D4580] font-primary mb-1">
            Garantía & Código Propio
          </h4>
          <p class="text-xs text-gray-500 font-secondary leading-relaxed">
            El sitio y los archivos son 100% tuyos, con soporte post-lanzamiento incluido.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
