<template>
  <el-menu
    class="admin-side-menu"
    default-active="1"
    active-text-color="#FDEDDD"
    background-color="#45465E"
    text-color="#FDEDDD"
    :router="true"
  >
    <el-menu-item
      v-for="item in SideNavList"
      :key="item.path"
      :index="item.path"
    >
      <el-icon><component :is="item.icon" /></el-icon>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import { SideNavList } from "@/constants/router";
</script>

<style scoped lang="scss">
.admin-side-menu {
  height: 100%;
}
</style>