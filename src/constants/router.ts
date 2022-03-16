import { RoutesItem, SideRoutesItem } from "@/typings/router";
import {
  HomeFilled as IconHomeFilled,
  List as IconList,
  PictureFilled as IconPictureFilled,
  Flag as IconFlag,
  Tools as IconTools,
  Key as IconKey,
  Message as IconMessage,
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
  {
    path: "/picture-list",
    name: "picture-list",
    component: () => import("@/views/picture/PictureList.vue"),
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/views/message/Message.vue"),
  },
  {
    path: "/log",
    name: "log",
    component: () => import("@/views/log/Log.vue"),
  },
  {
    path: "/tool",
    name: "tool",
    component: () => import("@/views/tool/Tool.vue"),
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("@/views/privacy/Privacy.vue"),
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
    name: "笔记",
    icon: IconList,
  },
  {
    path: "/picture-list",
    name: "图库",
    icon: IconPictureFilled,
  },
  {
    path: "/message",
    name: "留言板",
    icon: IconMessage,
  },
  {
    path: "/log",
    name: "日志",
    icon: IconFlag,
  },
  {
    path: "/tool",
    name: "工具",
    icon: IconTools,
  },
  {
    path: "/privacy",
    name: "隐私",
    icon: IconKey,
  },
];
