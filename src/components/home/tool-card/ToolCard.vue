<template>
  <CardPanel class="tool-card">
    <template #title>
      <el-icon><IconChatLineSquare /></el-icon>
      <span class="title-text">置顶工具箱</span>
    </template>
    <template #second-title> 便携工具插件 </template>
    <template #content>
      <div class="content">
      </div>
    </template>
  </CardPanel>
</template>

<script setup lang="ts">
import { ChatLineSquare as IconChatLineSquare } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.tool-card {
  flex: 1;
  margin-left: 8px;
}
.title-text {
  margin-left: 4px;
}
.background {
  position: absolute;
  right: 0;
  bottom: -170px;
  height: 200px;
  opacity: 0.5;
}
.content {
  position: relative;
}
</style>