<template>
  <HeaderNav>
    <template #icon>
      <el-icon><IconTools /></el-icon>
    </template>
    <template #title> 工具 </template>
  </HeaderNav>
  <div class="tool-wrapper">
    <ToolItem title="时间戳转化"></ToolItem>
    <ToolItem title="二维码生成"></ToolItem>
    <ToolItem title="HTML 编码器/解码器"></ToolItem>
    <ToolItem title="URL编码器/解码器"></ToolItem>
    <ToolItem title="Base64 编码器/解码器"></ToolItem>
    <ToolItem title="JSON 格式化程序"></ToolItem>
    <ToolItem title="二维码生成"></ToolItem>
  </div>
  <img class="tool-background" src="../../assets/img/tool_background.svg" />
</template>

<script setup lang="ts">
import { Tools as IconTools } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.tool-wrapper {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  ::v-deep .tool-item-wrapper {
    margin: 8px;
  }
}
.tool-background {
  width: 250px;
  position: fixed;
  right: 8px;
  bottom: 8px;
  opacity: 1;
  transition: all 0.2s ease;
  &:hover {
    opacity: 0;
  }
}
</style>