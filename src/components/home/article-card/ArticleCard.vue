<template>
  <CardPanel>
    <template #title>
      <el-icon><IconChatLineSquare /></el-icon>
      <span class="title-text">笔记</span>
    </template>
    <template #second-title> 笔记词云统计 </template>
    <template #content>
      <div class="content">
        <div class="article-charts" ref="chartRef" />
        <img
          class="article-background"
          src="../../../assets/img/home_article.svg"
        />
      </div>
    </template>
  </CardPanel>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import * as echarts from "echarts";
import "echarts-wordcloud";
import { ChatLineSquare as IconChatLineSquare } from "@element-plus/icons-vue";
import Api from "@/networks/api";

interface ArticleType {
  value: number;
  name: string;
}

const chartRef = ref(null);
let articleTypeList: Ref<ArticleType[]> = ref([]);

const getArticleTypeList = async () => {
  const data = await Api.Article.getArticleTypeList();
  articleTypeList.value = data.map((item) => ({
    value: Math.floor(Math.random() * 256),
    name: item.label,
  }));
};

const initChartsOption = () => {
  if (!chartRef.value) return;
  let chart = echarts.init(chartRef.value);
  chart.setOption({
    series: [
      {
        type: "wordCloud",
        shape: "diamond",
        width: "100%",
        height: "100%",
        sizeRange: [18, 30],
        rotationRange: [0, 0],
        rotationStep: 45,
        gridSize: 20,
        drawOutOfBound: false,
        textStyle: {
          fontFamily: "Franklin Gothic Medium",
          fontWeight: "bold",
          color: () => {
            return `rgb(
              ${Math.floor(Math.random() * 256)},
              ${Math.floor(Math.random() * 256)},
              ${Math.floor(Math.random() * 256)}
            )`;
          },
        },
        data: articleTypeList.value,
      },
    ],
    tooltip: {
      show: true,
      valueFormatter: (value: string) => value + "篇",
    },
  });
};

onMounted(async () => {
  await getArticleTypeList();
  initChartsOption();
});
</script>

<style scoped lang="scss">
.title-text {
  margin-left: 4px;
}
.article-charts {
  width: 400px;
  height: 120px;
  position: relative;
  z-index: 10;
}
.article-background {
  position: absolute;
  right: -40px;
  bottom: -50px;
  height: 200px;
  opacity: 0.4;
}
.content {
  position: relative;
}
</style>