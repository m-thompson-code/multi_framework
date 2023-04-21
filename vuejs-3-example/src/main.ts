import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import "./style.scss";
import AnimeDetails from "./views/AnimeDetails.vue";
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import Main from "./views/Main.vue";

const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        { path: "dashboard", component: Dashboard },
        { path: "anime/:id", component: AnimeDetails }
      ]
    },
    { path: "/login", component: Login }
  ]
});

createApp(App).use(router).use(createPinia()).mount("#app");
