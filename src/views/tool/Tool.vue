<template>
  <div class="tool-header">工具集</div>
  <div class="tool-wrapper">
    <ToolItem title="时间戳转化"></ToolItem>
    <ToolItem title="二维码生成"></ToolItem>
    <ToolItem title="HTML 编码器/解码器"></ToolItem>
    <ToolItem title="URL编码器/解码器"></ToolItem>
    <ToolItem title="Base64 编码器/解码器"></ToolItem>
    <ToolItem title="JSON 格式化程序"></ToolItem>
    <ToolItem title="二维码生成"></ToolItem>
  </div>
</template>


<style scoped lang="scss">
.tool-header {
  @include font-title();
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 2px solid $text-color-primary;
}
.tool-wrapper {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  ::v-deep .tool-item-wrapper {
    margin: 8px;
  }
}
</style>