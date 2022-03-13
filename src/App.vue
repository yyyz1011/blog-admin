<template>
  <ElConfigProvider :size="elConfig.size" :z-index="elConfig.zIndex">
    <router-view />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ElConfigProvider } from "element-plus";
import { ElConfig } from "@/typings/common";

const elConfig: ElConfig = reactive({
  zIndex: 3000,
  size: "small",
});
</script>