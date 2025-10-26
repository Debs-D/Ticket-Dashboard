<template>
  <div class="grid md:grid-cols-2 min-h-screen bg-linear-to-r from-[#E040FB] to-[#FFC2FF]">
    <!-- IMAGE SIDE -->
    <div class="hidden md:flex items-center justify-center">
      <img
        src="https://framerusercontent.com/images/f5N8nV6VGKRyj6jWBs2dAj8tjo.png"
        alt="Signup Illustration"
        class="w-[85%] drop-shadow-2xl"
      />
    </div>

    <!-- FORM SIDE -->
    <div class="bg-white rounded-l-3xl flex items-center justify-center p-10">
      <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-5 font-inter">
        <h2 class="text-3xl font-bold text-[#E040FB] text-center">Create Your Account</h2>
        <p class="text-gray-500 text-center">
          Join and start managing your tickets effortlessly.
        </p>

        <div class="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            v-model="form.firstName"
            icon="user"
          />
          <InputField
            label="Last Name"
            name="lastName"
            v-model="form.lastName"
            icon="user"
          />
        </div>

        <InputField
          label="Email"
          name="email"
          type="email"
          v-model="form.email"
          icon="mail"
        />

        <InputField
          label="Phone"
          name="phone"
          type="text"
          v-model="form.phone"
          icon="phone"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          v-model="form.password"
          icon="lock"
        />

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-linear-to-r from-[#E040FB] to-[#FFC2FF] text-white rounded-full font-semibold hover:opacity-90 transition"
        >
          {{ loading ? "Registering..." : "Sign Up" }}
        </button>

        <p class="text-sm text-center text-gray-600">
          Already have an account?
          <RouterLink
            to="/auth/login"
            class="text-[#E040FB] font-semibold hover:underline"
          >
            Login here
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import InputField from "@/components/InputField.vue";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const auth = useAuthStore();

const loading = ref(false);

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
});

const handleSubmit = () => {
  const { firstName, lastName, email, phone, password } = form;

  if (!firstName || !lastName || !email || !phone || !password)
    return toast.error("All fields are required.");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email))
    return toast.error("Enter a valid email address.");

  if (password.length < 6)
    return toast.error("Password must be at least 6 characters.");

  const userData = { firstName, lastName, email, phone };
  localStorage.setItem("ticketapp_session", JSON.stringify(userData));
  auth.login(userData);
  toast.success("Account created successfully!");
  router.push("/dashboard");
};
</script>
