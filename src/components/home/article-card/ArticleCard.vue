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
import { ref, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import "echarts-wordcloud";
import { ChatLineSquare as IconChatLineSquare } from "@element-plus/icons-vue";

interface ArticleType {
  value: number;
  name: string;
}

const chartRef = ref(null);
let articleTypeList: ArticleType[] = reactive([]);

const getArticleTypeList = () => {
  articleTypeList = [
    { value: Math.floor(Math.random() * 256), name: "Vue" },
    { value: Math.floor(Math.random() * 256), name: "React" },
    { value: Math.floor(Math.random() * 256), name: "Html" },
    { value: Math.floor(Math.random() * 256), name: "Css" },
    { value: Math.floor(Math.random() * 256), name: "Design" },
    { value: Math.floor(Math.random() * 256), name: "随笔" },
    { value: Math.floor(Math.random() * 256), name: "ES" },
    { value: Math.floor(Math.random() * 256), name: "牛逼" },
    { value: Math.floor(Math.random() * 256), name: "哇哦" },
    { value: Math.floor(Math.random() * 256), name: "好棒哦" },
    { value: Math.floor(Math.random() * 256), name: "哥哥厉害" },
  ];
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
        data: articleTypeList,
      },
    ],
    tooltip: {
      show: true,
      valueFormatter: (value: string) => value + "篇",
    },
  });
};

onMounted(() => {
  getArticleTypeList();
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