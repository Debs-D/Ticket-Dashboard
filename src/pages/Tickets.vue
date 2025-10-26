<template>
  <div class="flex flex-col min-h-screen bg-gray-50 font-inter text-gray-800">
    <Navbar />

    <main class="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 mt-20">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-[#E040FB]">Manage Your Tickets</h1>

        <button
          @click="goBack"
          class="flex items-center gap-2 bg-white border border-[#E040FB] text-[#E040FB] px-5 py-2 rounded-full hover:bg-[#E040FB] hover:text-white transition shadow-sm"
        >
          <ArrowLeft class="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>

      <!-- Form -->
      <form
        @submit.prevent="handleSubmit"
        class="bg-white p-6 rounded-2xl shadow-md mb-10 border border-gray-100"
      >
        <div class="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Title *"
            v-model="form.title"
            class="border p-3 rounded-md w-full focus:ring-2 focus:ring-[#E040FB] outline-none"
          />
          <select
            v-model="form.status"
            class="border p-3 rounded-md w-full focus:ring-2 focus:ring-[#E040FB] outline-none"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <textarea
          placeholder="Description (optional)"
          v-model="form.description"
          class="border p-3 rounded-md w-full mt-4 h-28 resize-none focus:ring-2 focus:ring-[#E040FB] outline-none"
        />

        <button
          type="submit"
          class="mt-6 bg-[#E040FB] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-pink-500 transition"
        >
          {{ editIndex !== null ? "Update Ticket" : "Create Ticket" }}
        </button>
      </form>

      <!-- Ticket List -->
      <p v-if="tickets.length === 0" class="text-center text-gray-500 mt-8">
        No tickets yet — create one above!
      </p>

      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(ticket, i) in tickets"
          :key="i"
          class="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all relative"
        >
          <span
            :class="[
              'absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium capitalize',
              statusColor[ticket.status],
            ]"
          >
            {{ ticket.status.replace('_', ' ') }}
          </span>

          <h3 class="mt-4 font-bold text-xl text-gray-800">{{ ticket.title }}</h3>
          <p class="text-gray-600 text-sm mt-2 min-h-[60px]">
            {{ ticket.description || 'No description provided.' }}
          </p>

          <div class="flex items-center justify-end gap-3 mt-6">
            <button
              @click="handleEdit(i)"
              class="flex items-center gap-1 text-[#E040FB] hover:underline font-medium"
            >
              <Edit class="h-4 w-4" /> Edit
            </button>
            <button
              @click="handleDelete(i)"
              class="flex items-center gap-1 text-red-500 hover:underline font-medium"
            >
              <Trash2 class="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft, Edit, Trash2 } from "lucide-vue-next";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { useAuthStore } from "@/store/auth"; 
import { useToast } from "vue-toastification"; 

const toast = useToast();
const router = useRouter();
const auth = useAuthStore();

const user = computed(() => auth.user);
const tickets = ref([]);
const editIndex = ref(null);
const form = reactive({
  title: "",
  description: "",
  status: "open",
});

onMounted(() => {
  if (user.value?.email) {
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    tickets.value = allTickets.filter((t) => t.userEmail === user.value.email);
  }
});

const saveTickets = (newUserTickets) => {
  const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  const others = allTickets.filter((t) => t.userEmail !== user.value?.email);
  const updated = [...others, ...newUserTickets];
  localStorage.setItem("tickets", JSON.stringify(updated));
};

const validate = () => {
  if (!form.title.trim()) {
    toast.error("Title is required!");
    return false;
  }
  if (!["open", "in_progress", "closed"].includes(form.status)) {
    toast.error("Invalid status!");
    return false;
  }
  return true;
};

const handleSubmit = () => {
  if (!validate()) return;

  const newTickets = [...tickets.value];
  const ticketData = { ...form, userEmail: user.value?.email };

  if (editIndex.value !== null) {
    newTickets[editIndex.value] = ticketData;
    toast.success("Ticket updated successfully!");
    editIndex.value = null;
  } else {
    newTickets.push(ticketData);
    toast.success("Ticket created successfully!");
  }

  tickets.value = newTickets;
  saveTickets(newTickets);
  Object.assign(form, { title: "", description: "", status: "open" });
};

const handleEdit = (i) => {
  Object.assign(form, tickets.value[i]);
  editIndex.value = i;
};

const handleDelete = (i) => {
  if (confirm("Are you sure you want to delete this ticket?")) {
    const newTickets = tickets.value.filter((_, index) => index !== i);
    tickets.value = newTickets;
    saveTickets(newTickets);
    toast.success("Ticket deleted!");
  }
};

const goBack = () => {
  router.push("/dashboard");
};

const statusColor = {
  open: "bg-green-100 text-green-700",
  in_progress: "bg-amber-100 text-amber-700",
  closed: "bg-gray-200 text-gray-700",
};
</script>
