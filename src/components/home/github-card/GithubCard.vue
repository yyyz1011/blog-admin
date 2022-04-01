<template>
  <CardPanel>
    <template #title>
      <el-icon><IconChatLineSquare /></el-icon>
      <span class="title-text">代码统计</span>
    </template>
    <template #second-title> Github代码统计 </template>
    <template #content>
      <div class="wrapper">
        <img
          class="github-summary"
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=yyyz1011&layout=compact&hide_border=true&hide_title=true"
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
::v-deep .el-card__body {
  padding-top: 0 !important;
}
.wrapper {
  text-align: center;
}
.github-summary {
  width: 400px;
  height: 200px;
  position: relative;
  bottom: 7px;
}
</style>