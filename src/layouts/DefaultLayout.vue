<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Navbar />
    <main class="flex-1 mt-16">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
