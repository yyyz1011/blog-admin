<template>
  <HeaderNav>
    <template #icon>
      <el-icon><IconFlag /></el-icon>
    </template>
    <template #title> 日志 </template>
  </HeaderNav>
  <div class="log-content">
    <div v-for="item in Object.keys(logInfo)" :key="item">
      <el-divider>{{ item }}</el-divider>
      <NoData v-if="!logInfo[item].length"></NoData>
      <el-descriptions
        class="descriptions-info"
        v-for="cItem in logInfo[item]"
        :key="cItem.date"
        :title="getBracketStr(cItem.date)"
        direction="vertical"
        border
      >
        <el-descriptions-item label="日志级别">
          <el-tag type="danger">{{ getBracketStr(cItem.type) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="错误码">
          {{ cItem.code }}
        </el-descriptions-item>
        <el-descriptions-item label="错误提示">
          {{ cItem.message }}
        </el-descriptions-item>
        <el-descriptions-item label="错误URL">
          {{ cItem.url }}
        </el-descriptions-item>
        <el-descriptions-item label="请求Method">
          <el-tag type="danger">{{ cItem.method }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="请求体">
          <div v-if="cItem.query !== '{}'">{{ cItem.query }}</div>
          <div v-if="cItem.body !== '{}'">{{ cItem.body }}</div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { Flag as IconFlag } from "@element-plus/icons-vue";
import Api from "@/networks/api";
import { ElMessage } from "element-plus";

let logInfo: Ref<any> = ref({});

getLogList();

async function getLogList() {
  try {
    const data = await Api.Log.getLogList();
    logInfo.value = data;
    console.log(data);
  } catch (err: any) {
    ElMessage.error(err.message);
  }
}

function getBracketStr(text: string) {
  return text.substring(1, text.length - 1);
}
</script>
    
<style scoped lang="scss">
.log-content {
  margin: 16px;
}
.descriptions-info {
  margin-bottom: 16px;
}
</style>