<template>
  <nav class="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-lg shadow-sm z-50">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <RouterLink to="/" class="text-2xl font-bold text-[#E040FB]">
        🎟️ TicketApp
      </RouterLink>

      <ul class="hidden md:flex items-center gap-8 text-gray-700 font-medium">
        <li><a href="#features" class="hover:text-[#E040FB]">Features</a></li>
        <li><a href="#about" class="hover:text-[#E040FB]">About</a></li>
        <li><a href="#faq" class="hover:text-[#E040FB]">FAQs</a></li>
      </ul>

      <div class="hidden md:flex items-center gap-4">
        <RouterLink
          v-if="auth.isAuthenticated"
          to="/dashboard"
          class="flex items-center gap-2 hover:text-[#E040FB] transition"
        >
          <User class="h-5 w-5 text-gray-800" />
          <span class="font-medium">Dashboard</span>
        </RouterLink>

        <RouterLink
          v-else
          to="/auth/login"
          class="bg-[#E040FB] text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-500 transition"
        >
          Log in / Register
        </RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden" @click="open = !open" aria-label="menu">
        <component :is="open ? X : Menu" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="open" class="md:hidden bg-white shadow-inner">
      <ul class="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
        <li><a href="#features" @click="open = false">Features</a></li>
        <li><a href="#about" @click="open = false">About</a></li>
        <li><a href="#faq" @click="open = false">FAQs</a></li>

        <RouterLink
          v-if="auth.isAuthenticated"
          to="/dashboard"
          @click="open = false"
          class="flex items-center gap-2 hover:text-[#E040FB]"
        >
          <User class="h-5 w-5" />
          Dashboard
        </RouterLink>

        <RouterLink
          v-else
          to="/auth/login"
          @click="open = false"
          class="bg-[#E040FB] text-white px-6 py-2 rounded-md hover:bg-pink-500 transition"
        >
          Log in / Register
        </RouterLink>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { Menu, X, User } from "lucide-vue-next";
import { useAuthStore } from "@/store/auth";
import { RouterLink } from "vue-router";

const open = ref(false);
const auth = useAuthStore();
</script>
