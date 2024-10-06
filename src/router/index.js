import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutUsView from "../views/AboutUsView.vue";
import ProductView from "../views/ProductView.vue";
import { useAuthStore } from "/src/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutUsView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductView,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/favorite",
      name: "favorite",
      component: () => import("../views/FavoriteView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to) => {
  const store = useAuthStore();

  if (localStorage.getItem("id") && store.user.id == "") {
    store.user.id = localStorage.getItem("id");
    store.user.email = localStorage.getItem("email");
    store.user.role = localStorage.getItem("role");
    store.user.isAuthenticated =
      localStorage.getItem("isAuthenticated") == "true" ? true : false;
    store.user.access_token = localStorage.getItem("access_token");
    store.user.refresh_token = localStorage.getItem("refresh_token");
    store.user.lang = localStorage.getItem("lang");
  }

  if (to.meta.requiresAdmin && !(store.user.role == "ADMIN")) {
    return {
      path: "/home",
    };
  }

  if (
    to.meta.requiresAuth &&
    !store.user.isAuthenticated &&
    !(store.user.role == "USER")
  ) {
    return {
      path: "/home",
    };
  }
});

export default router;
