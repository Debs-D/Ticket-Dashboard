import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from "./router";
import App from "./App.vue";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
});

app.mount("#app");
