<template>
  <HeaderNav>
    <template #icon>
      <el-icon><IconList /></el-icon>
    </template>
    <template #title> 笔记 </template>
    <template #operate>
      <el-button type="primary"> 上传笔记 </el-button>
    </template>
  </HeaderNav>
  <div class="article-wrapper">
    <el-tabs tab-position="left" class="tabs" v-model="currentTab">
      <el-tab-pane
        v-for="item in articleSummaryList"
        :key="item.id"
        :name="item.id"
      >
        <template #label>
          <span class="label">{{ item.label }}</span>
          <el-tag hit size="small" class="tag">{{ item.amount }}</el-tag>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div>{{ currentTab }} hello</div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, watch } from "vue";
import { List as IconList } from "@element-plus/icons-vue";

let currentTab: Ref<string> = ref("-1");
interface ArticleSummaryItem {
  id: string;
  label: string;
  amount: string;
}
let articleSummaryList: Ref<ArticleSummaryItem[]> = ref([]);
function getArticleSummary() {
  articleSummaryList.value = [
    {
      id: "-1",
      label: "全部",
      amount: "12",
    },
    {
      id: "1",
      label: "Vue",
      amount: "1",
    },
    {
      id: "2",
      label: "React",
      amount: "11",
    },
  ];
}
function getArticleList(id?: string) {
  const articleTypeId = id ?? currentTab.value;
  console.log(articleTypeId);
}

watch(currentTab, (val) => {
  getArticleList(val);
});

onMounted(() => {
  getArticleSummary();
  getArticleList();
});
</script>
    

<style scoped lang="scss">
.article-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.tabs {
  height: 100%;
  .tag {
    margin-left: 4px;
    width: 50px;
  }
}
</style>