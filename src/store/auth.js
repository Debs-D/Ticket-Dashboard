import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("ticketapp_session")) || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    login(userData) {
      this.user = userData;
      localStorage.setItem("ticketapp_session", JSON.stringify(userData));
    },
    logout() {
      this.user = null;
      localStorage.removeItem("ticketapp_session");
    },
  },
});
