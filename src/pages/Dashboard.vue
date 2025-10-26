<template>
  <DefaultLayout>
    <div class="flex flex-col min-h-screen bg-gray-50">
      <!-- Navbar -->
      <Navbar />

      <div class="flex flex-1 mt-14">
        <!-- Sidebar (Desktop) -->
        <aside
          class="hidden md:flex flex-col justify-between w-64 bg-white border-r shadow-sm p-6 sticky top-14 h-[calc(100vh-3.5rem)]"
        >
          <div>
            <h2 class="text-xl font-bold mb-6 text-[#E040FB]">Dashboard</h2>
            <nav class="space-y-2">
              <button
                v-for="item in navItems"
                :key="item.id"
                @click="activeView = item.id"
                :class="[
                  'flex items-center w-full gap-3 px-4 py-2 rounded-lg transition-all',
                  activeView === item.id
                    ? 'bg-[#E040FB] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100',
                ]"
              >
                <component :is="item.icon" class="h-5 w-5" />
                {{ item.title }}
              </button>
            </nav>
          </div>

          <button
            @click="handleLogout"
            class="flex items-center gap-3 bg-[#E040FB]/90 px-4 py-2 rounded-full text-white hover:bg-[#E040FB] shadow-sm transition"
          >
            <LogOut class="h-5 w-5" />
            Logout
          </button>
        </aside>

        <!-- Sidebar (Mobile) -->
        <div v-if="isSidebarOpen" class="fixed inset-0 z-50 flex md:hidden">
          <div class="fixed inset-0 bg-black/40" @click="isSidebarOpen = false" />
          <aside
            class="relative w-64 bg-white h-full shadow-xl p-6 flex flex-col justify-between animate-slide-in-left"
          >
            <div>
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-[#E040FB]">Menu</h2>
                <X
                  class="h-6 w-6 text-gray-600 cursor-pointer"
                  @click="isSidebarOpen = false"
                />
              </div>

              <nav class="space-y-2">
                <button
                  v-for="item in navItems"
                  :key="item.id"
                  @click="() => { activeView = item.id; isSidebarOpen = false; }"
                  :class="[
                    'flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all',
                    activeView === item.id
                      ? 'bg-[#E040FB] text-white'
                      : 'text-gray-700 hover:bg-gray-100',
                  ]"
                >
                  <component :is="item.icon" class="h-5 w-5" />
                  {{ item.title }}
                </button>
              </nav>
            </div>

            <button
              @click="handleLogout"
              class="flex items-center gap-3 bg-[#E040FB]/90 px-4 py-2 rounded-full text-white hover:bg-[#E040FB] shadow-sm transition"
            >
              <LogOut class="h-5 w-5" />
              Logout
            </button>
          </aside>
        </div>

        <!-- Mobile Top Bar -->
        <div
          class="md:hidden fixed top-14 left-0 w-full bg-white border-b shadow-sm flex items-center justify-between px-4 py-3 z-30"
        >
          <button @click="isSidebarOpen = true">
            <Menu class="h-6 w-6 text-gray-700" />
          </button>
          <h2 class="text-lg font-semibold text-[#E040FB]">Dashboard</h2>
          <div class="w-6" />
        </div>

        <!-- Main Content -->
        <main
          class="flex-1 p-6 md:ml-0 bg-gray-50 min-h-[calc(100vh-6rem)] mt-4 md:mt-0"
        >
          <!-- Overview -->
          <section v-if="activeView === 'overview'">
            <h1 class="text-3xl font-bold text-[#E040FB] mb-6">
              Welcome, {{ user?.firstName || 'User' }} 👋
            </h1>
            <div class="grid sm:grid-cols-3 gap-6 mb-12">
              <div
                v-for="(stat, i) in stats"
                :key="i"
                class="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all text-center"
              >
                <p class="text-3xl font-bold text-[#E040FB]">{{ stat.value }}</p>
                <p class="text-gray-700 font-medium">{{ stat.label }}</p>
              </div>
            </div>
            <RouterLink
              to="/tickets"
              class="bg-[#E040FB] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-pink-500 transition"
            >
              Manage Tickets
            </RouterLink>
          </section>

          <!-- Tickets -->
          <section v-if="activeView === 'tickets'">
            <h1 class="text-2xl font-semibold text-[#E040FB] mb-6">
              My Tickets
            </h1>

            <p v-if="userTickets.length === 0" class="text-gray-500">
              You have no tickets yet.
              <RouterLink to="/tickets" class="text-[#E040FB] hover:underline">
                Create one here.
              </RouterLink>
            </p>

            <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="(ticket, i) in userTickets"
                :key="i"
                class="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all relative"
              >
                <span
                  class="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium capitalize"
                  :class="statusColor(ticket.status)"
                >
                  {{ formatStatus(ticket.status) }}
                </span>
                <h3 class="mt-4 font-bold text-xl text-gray-800">
                  {{ ticket.title }}
                </h3>
                <p class="text-gray-600 text-sm mt-2 min-h-[60px]">
                  {{ ticket.description || 'No description provided.' }}
                </p>
              </div>
            </div>
          </section>

          <!-- Profile -->
          <section v-if="activeView === 'profile'">
            <h1 class="text-2xl font-semibold text-[#E040FB] mb-4">Profile</h1>
            <div class="bg-white p-6 rounded-xl shadow-sm max-w-lg space-y-3">
              <p><strong>Name:</strong> {{ user?.firstName || 'User' }}</p>
              <p><strong>Email:</strong> {{ user?.email || 'N/A' }}</p>
            </div>
          </section>
        </main>
      </div>

      <!-- Footer -->
      <Footer />
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useAuthStore } from "@/store/auth";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {
  LayoutDashboard,
  Ticket,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-vue-next";

const router = useRouter();
const auth = useAuthStore();
const user = computed(() => auth.user);

const activeView = ref("overview");
const isSidebarOpen = ref(false);
const userTickets = ref([]);

const navItems = [
  { id: "overview", title: "Overview", icon: LayoutDashboard },
  { id: "tickets", title: "My Tickets", icon: Ticket },
  { id: "profile", title: "Profile", icon: User },
];

const stats = [
  { label: "Total Tickets", value: 42 },
  { label: "Open Tickets", value: 15 },
  { label: "Resolved Tickets", value: 27 },
];

const handleLogout = () => {
  auth.logout();
  toast.success("You’ve been logged out successfully.");
  router.push("/auth/login");
};

const formatStatus = (status) =>
  status ? status.replace("_", " ") : "unknown";

const statusColor = (status) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-700";
    case "in_progress":
      return "bg-amber-100 text-amber-700";
    case "closed":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem("tickets") || "[]");
  if (user.value?.email) {
    userTickets.value = stored.filter(
      (t) => t.userEmail === user.value.email
    );
  }
});
</script>

<style>
@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in-left {
  animation: slide-in-left 0.3s ease forwards;
}
</style>
