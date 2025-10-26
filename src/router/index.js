import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Auth/Login.vue";
import Signup from "@/pages/Auth/Signup.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Tickets from "@/pages/Tickets.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/auth/login", name: "Login", component: Login },
    { path: "/auth/signup", name: "Signup", component: Signup },
    { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/tickets", name: "Tickets", component: Tickets, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("ticketapp_session");
  if (to.meta.requiresAuth && !session) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
