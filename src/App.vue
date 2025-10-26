<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <main class="grow w-full">
      <div class="max-w-[1440px] mx-auto px-4">
        <router-view />
      </div>
    </main>

  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
