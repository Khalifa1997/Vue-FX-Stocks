import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import StockView from "../views/StockView.vue";
import FXView from "../views/FXView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/stock",
    name: "stocks",
    component: StockView,
  },
  {
    path: "/fx",
    name: "fx",
    component: FXView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
