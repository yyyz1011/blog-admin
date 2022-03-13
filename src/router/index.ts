import { createRouter, createWebHistory } from "vue-router";

interface RoutesItem {
  path: string;
  name: string;
  component: any;
}
const routes: Array<RoutesItem> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((guard) => {
  console.log("beforeEach", guard.name);
});

router.onError((handler) => {
  console.log("router error:", handler);
});

export default router;
