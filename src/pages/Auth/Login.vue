<template>
  <div class="grid md:grid-cols-2 min-h-screen bg-linear-to-r from-[#E040FB] to-[#FFC2FF]">
    <!-- IMAGE SIDE -->
    <div class="hidden md:flex items-center justify-center">
      <img
        src="https://framerusercontent.com/images/f5N8nV6VGKRyj6jWBs2dAj8tjo.png"
        alt="Login Illustration"
        class="w-[85%] drop-shadow-2xl"
      />
    </div>

    <!-- FORM SIDE -->
    <div class="bg-white rounded-l-3xl flex items-center justify-center p-10">
      <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-5 font-inter">
        <h2 class="text-3xl font-bold text-[#E040FB] text-center">Welcome Back</h2>
        <p class="text-gray-500 text-center">
          Login to manage your event tickets easily.
        </p>

        <!-- Email Input -->
        <div class="space-y-1">
          <label class="text-sm text-gray-700 font-medium">Email</label>
          <div
            class="flex items-center border border-gray-200 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#E040FB]"
          >
            <Mail class="text-gray-400" />
            <input
              v-model="form.email"
              type="email"
              name="email"
              placeholder="Enter your email"
              class="ml-2 w-full outline-none placeholder-gray-400"
            />
          </div>
        </div>

        <!-- Password Input -->
        <div class="space-y-1">
          <label class="text-sm text-gray-700 font-medium">Password</label>
          <div
            class="flex items-center border border-gray-200 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#E040FB]"
          >
            <Lock class="text-gray-400" />
            <input
              v-model="form.password"
              type="password"
              name="password"
              placeholder="Enter your password"
              class="ml-2 w-full outline-none placeholder-gray-400"
            />
          </div>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full py-3 bg-linear-to-r from-[#E040FB] to-[#FFC2FF] text-white rounded-full font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        <p class="text-sm text-center text-gray-600">
          Don't have an account?
          <RouterLink
            to="/auth/signup"
            class="text-[#E040FB] font-semibold hover:underline"
          >
            Sign up here
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { Mail, Lock } from "lucide-vue-next";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const handleSubmit = () => {
  if (!form.email || !form.password) {
    toast.error("Please fill in all fields.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("ticketapp_session"));
  if (!user) return toast.error("No user found. Please sign up first.");
  if (user.email !== form.email) return toast.error("Invalid email. Please try again.");
  if (form.password.length < 6) return toast.error("Invalid password format.");

  auth.login(user);
  toast.success("Welcome back!");
  router.push("/dashboard");
};
</script>
