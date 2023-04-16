import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import "./style.css";
import About from "./views/About.vue";
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";

const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    { path: "/dashboard", name: "dashboard", component: Dashboard },
    { path: "/about", component: About },
    { path: "/login", component: Login },
  ],
});

createApp(App).use(router).mount("#app");
