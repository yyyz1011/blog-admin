<template>
  <CardPanel>
    <template #title>
      <el-icon><IconChatLineSquare /></el-icon>
      <span class="title-text">笔记</span>
    </template>
    <template #second-title> 笔记词云统计 </template>
    <template #content>
      <div class="content">
        <img
          class="article-background"
          src="../../../assets/img/home_article.svg"
        />
      </div>
    </template>
  </CardPanel>
</template>

<script setup lang="ts">
import { ChatLineSquare as IconChatLineSquare } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.title-text {
  margin-left: 4px;
}
.article-background {
  position: absolute;
  right: -40px;
  bottom: -170px;
  height: 200px;
  opacity: 0.5;
}
.content {
  position: relative;
}
</style>