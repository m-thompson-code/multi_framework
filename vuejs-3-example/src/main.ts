import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import Login from "./components/views/LoginView.vue";
import Main from "./components/views/MainLayout.vue";
import { DisplayForTime, displayForTime, displayForTime2 } from "./directives/display-for-time";
import { useAuthenticationStore } from "./store";
import "./style.scss";

const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Main, // eager load
      children: [
        // lazy load
        { path: "dashboard", component: () => import("./components/views/DashboardView.vue") },
        { path: "anime/:id", component: () => import("./components/views/AnimeDetailsView.vue") }
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

createApp(App)
  .use(router)
  .use(createPinia())
  .directive("sticky", function (el, binding, vnode) {
    const loc = binding.arg === "bottom" ? "bottom" : "top";
    el.style.position = "fixed";
    el.style[loc] = 0;
    if (loc === "bottom") {
      el.style.background = "burlywood";
    } else {
      el.style.background = "#7e7e7e";
    }
  })
  .directive("displayForTime", (el: HTMLElement, binding: DisplayForTime, vnode) => {
    displayForTime(el, binding);
  })
  .directive("displayForTime2", displayForTime2)
  .mount("#app");
