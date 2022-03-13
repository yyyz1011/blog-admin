import { RoutesItem, SideRoutesItem } from "@/typings/router";
import {
  HomeFilled as IconHomeFilled,
  List as IconList,
} from "@element-plus/icons-vue";

export const RoutesList: Array<RoutesItem> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/Home.vue"),
  },
  {
    path: "/article-list",
    name: "article-list",
    component: () => import("@/views/article/ArticleList.vue"),
  },
];

export const SideNavList: Array<SideRoutesItem> = [
  {
    path: "/",
    name: "首页",
    icon: IconHomeFilled,
  },
  {
    path: "/article-list",
    name: "笔记列表",
    icon: IconList,
  },
];
