<template>
  <div class="max-w-[1440px] mx-auto font-inter text-gray-900 overflow-hidden">
    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <section
      class="relative bg-linear-to-r from-[#E040FB] to-[#FFC2FF] min-h-[90vh] flex flex-col justify-center items-center text-center px-6"
    >
      <h1 class="text-5xl md:text-6xl font-extrabold text-white leading-tight">
        Simplify Your <span class="text-pink-100">Event Tickets</span>
      </h1>
      <p class="mt-6 text-lg text-white/90 max-w-2xl">
        Manage, track, and resolve tickets effortlessly powered by
        <strong>TicketApp</strong>.
      </p>

      <div class="mt-8 flex gap-4 flex-wrap justify-center">
        <RouterLink
          to="/auth/signup"
          class="bg-white text-[#E040FB] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-100 transition"
        >
          Get Started
        </RouterLink>
        <a
          href="#about"
          class="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
        >
          Learn More
        </a>
      </div>

      <!-- Wavy Bottom -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-32"
        >
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,64L48,96C96,128,192,192,288,208C384,224,480,192,576,181.3C672,171,768,181,864,186.7C960,192,1056,192,1152,165.3C1248,139,1344,85,1392,58.7L1440,32V320H0Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- About Section -->
    <section
      id="about"
      class="relative py-28 bg-white flex flex-col items-center justify-center text-center px-8"
    >
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <img
          src="https://framerusercontent.com/images/f5N8nV6VGKRyj6jWBs2dAj8tjo.png?scale-down-to=1024&width=1380&height=1460"
          alt="Tickets illustration"
          class="w-full max-w-sm mx-auto md:mx-0 drop-shadow-2xl"
        />

        <div class="text-center md:text-left">
          <h2 class="text-4xl font-bold mb-6 text-[#E040FB]">
            What is TicketApp?
          </h2>
          <p class="text-gray-700 leading-relaxed text-lg">
            TicketApp is your all-in-one platform for managing event tickets
            with ease. From creating new tickets to resolving issues, it keeps
            everything organized, smart, and fast — so you can focus on what
            matters most: your events.
          </p>
          <RouterLink
            to="/auth/signup"
            class="inline-block mt-8 bg-linear-to-r from-[#E040FB] to-[#FFC2FF] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition"
          >
            Get Started
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-8 bg-gray-50">
      <h2 class="text-3xl font-bold text-center text-[#E040FB] mb-12">
        Key Features
      </h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center"
        >
          <div class="text-5xl mb-4">{{ f.icon }}</div>
          <h3 class="font-semibold text-lg mb-2">{{ f.title }}</h3>
          <p class="text-gray-600 text-sm">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const features = [
  {
    title: "Create & Manage",
    desc: "Easily create, view, update, and delete tickets in one place.",
    icon: "📝",
  },
  {
    title: "Smart Dashboard",
    desc: "Visual insights for total, open, and resolved tickets at a glance.",
    icon: "📊",
  },
  {
    title: "Secure Authentication",
    desc: "Protect your data with secure session handling and redirects.",
    icon: "🔒",
  },
];
</script>

<style scoped>
.font-inter {
  font-family: "Inter", sans-serif;
}
</style>
