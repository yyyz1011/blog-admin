<template>
  <div class="tool-item-wrapper" @click="dialogVisible = true">
    <el-icon class="icon-setting"><Setting /></el-icon>
    <slot name="title">
      <div class="setting-title">{{ props.title }}</div>
    </slot>
    <el-dialog
      v-model="dialogVisible"
      :title="props.title"
      width="80%"
      :append-to-body="true"
      :before-close="() => (dialogVisible = false)"
    >
      <div>
        <slot name="dialogContent"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { Setting } from "@element-plus/icons-vue";

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
});

let dialogVisible: Ref<boolean> = ref(false);
</script> 

<style scoped lang="scss">
.tool-item-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: #ffffff;
  color: $text-color-primary;
  box-shadow: 2px 2px 6px #d9d9d9, -2px -2px 6px #ffffff;
  min-width: 200px;
  padding: 8px 16px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  position: relative;
  &:hover {
    background: $text-color-primary;
    color: $text-color-reverse;
    transform: translateY(-3px);
  }
  .icon-setting {
    font-size: 25px;
  }
  .setting-title {
    font-size: 20px;
    font-weight: lighter;
    margin-left: 8px;
  }
}
</style>

<style lang="scss">
.el-dialog {
  border-radius: $border-radius-large;
}
</style>