import { createRouter, createWebHistory } from "vue-router";
import { RoutesList } from "@/constants/router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: RoutesList,
});

router.beforeEach((guard) => {
  console.log("beforeEach", guard.name);
});

router.onError((handler) => {
  console.error("router error:", handler);
});

export default router;
