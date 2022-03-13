<template>
  <CardPanel>
    <template #title>
      <el-icon><IconNotification /></el-icon>
      <span class="title-text">概览</span>
    </template>
    <template #second-title> 数据更新于{{ modifyTime }} </template>
    <template #content>
      <div class="summary-content">
        <StatisticCard
          v-for="item in summaryInfoList"
          :key="item.title"
          :title="item.title"
          :amount="item.count"
        >
          <template #amountAppend>{{ item.countAppend }}</template>
        </StatisticCard>
        <img class="summary-background" src="../../../assets/img/summary.svg" />
      </div>
    </template>
  </CardPanel>
</template>

<script setup lang="ts">
import { Ref, ref, reactive } from "vue";
import dayjs from "dayjs";
import { Notification as IconNotification } from "@element-plus/icons-vue";

const modifyTime: Ref<string> = ref(dayjs().format("YYYY年MM月DD日 HH:mm"));

interface SummaryInfoListItem {
  title: string;
  count: string | number;
  countAppend: string;
}
const summaryInfoList: Array<SummaryInfoListItem> = reactive([
  {
    title: "笔记",
    count: "123",
    countAppend: "篇",
  },
  {
    title: "图库",
    count: "123123123",
    countAppend: "张",
  },
  {
    title: "浏览量",
    count: "12311",
    countAppend: "次",
  },
  {
    title: "日志报错",
    count: "0",
    countAppend: "个",
  },
]);
</script>

<style scoped lang="scss">
::v-deep .statistic-card {
  width: 45%;
}

.title-text {
  margin-left: 4px;
}
.summary-background {
  position: absolute;
  right: 0;
  bottom: -70px;
  height: 200px;
  opacity: 0.5;
}
.summary-content {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
</style>