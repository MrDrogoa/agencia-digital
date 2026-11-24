<script setup>
import HeroContact from "@/components/hero/contact/HeroContact.vue";
import ContactData from "@/components/main/contactmain/ContactData.vue";
import ContactForm from "@/components/main/contactmain/ContactForm.vue";
</script>

<template>
  <section class="max-w-325 mx-auto px-4 xl:px-0">
    <div>
      <hero-contact />
    </div>
    <div
      class="flex md:flex-row flex-col gap-4 md:gap-8 lg:gap-10 pt-8 md:pt-10 lg:pt-15 xl:pt-20"
    >
      <contact-data />
      <contact-form />
    </div>
  </section>
</template>
