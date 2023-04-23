import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import { useAuthenticationStore } from "./store";
import "./style.scss";
import Login from "./views/LoginView.vue";
import Main from "./views/MainLayout.vue";

const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Main, // eager load
      children: [
        // lazy load
        { path: "dashboard", component: () => import("./views/DashboardView.vue") },
        { path: "anime/:id", component: () => import("./views/AnimeDetailsView.vue") }
      ]
    },
    { path: "/login", component: Login }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  }
});

router.beforeEach(async (to, from, next): Promise<void> => {
  const authenticationStore = useAuthenticationStore();

  if (!authenticationStore.user && to.path !== "/login") {
    return next("/login");
  }

  return next();
});

createApp(App).use(router).use(createPinia()).mount("#app");
