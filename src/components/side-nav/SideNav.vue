<template>
  <el-menu
    class="admin-side-menu"
    default-active="1"
    active-text-color="#FDEDDD"
    background-color="#45465E"
    text-color="#FDEDDD"
    :router="true"
  >
    <div class="admin-side-menu--header">
      <el-icon class="admin-logo"><IconStarFilled /></el-icon>
      <span class="admin-title">{{ AdminName }}</span>
    </div>
    <el-menu-item
      v-for="item in SideNavList"
      :key="item.path"
      :index="item.path"
    >
      <el-icon><component :is="item.icon" /></el-icon>
      <span>{{ item.name }}</span>
    </el-menu-item>
    <div class="blog-link-card" @click="handleGoBlog">
      <img class="blog-link-card--img" src="../../assets/img/leaf.svg" />
      <span class="blog-link-card--title">Leaf Blog</span>
    </div>
    <div class="github-link-card" @click="handleGoGithub">
      <img class="github-link-card--img" src="../../assets/img/github.svg" />
      <span class="github-link-card--title">Github</span>
    </div>
  </el-menu>
</template>
<script lang="ts" setup>
import { SideNavList } from "@/constants/router";
import { StarFilled as IconStarFilled } from "@element-plus/icons-vue";
import { AdminName } from "@/constants/common";

function handleGoBlog() {
  console.log("TODO 跳转博客");
}

function handleGoGithub() {
  window.open("https://github.com/yyyz1011");
}
</script>

<style scoped lang="scss">
.admin-side-menu {
  height: 100%;
  position: relative;
  &--header {
    color: $text-color-reverse;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    user-select: none;
    padding: 24px 0;
    .admin-logo {
      margin-right: 8px;
    }
  }
  .blog-link-card {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    height: 60px;
    width: 80%;
    background: $background-white;
    border-radius: $border-radius-normal;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
    &:hover {
      transform: translateX(-50%) translateY(-4px);
    }
    &--img {
      height: 40px;
      margin-right: 4px;
    }
    &--title {
      font-size: 20px;
      color: $text-color-primary;
    }
  }
}

.github-link-card {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  height: 60px;
  width: 80%;
  background: $background-white;
  border-radius: $border-radius-normal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  &:hover {
    transform: translateX(-50%) translateY(-4px);
  }
  &--img {
    height: 40px;
    margin-right: 4px;
  }
  &--title {
    margin-left: 10px;
    font-size: 20px;
    color: $text-color-primary;
  }
}
</style>