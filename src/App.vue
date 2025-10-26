<template>
    <div className="max-w-[1440px] mx-auto">
    <Navbar />
    <main class="grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>
