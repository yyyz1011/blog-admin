<template>
  <HeaderNav>
    <template #icon>
      <el-icon><IconList /></el-icon>
    </template>
    <template #title> 笔记 </template>
    <template #operate>
      <el-button type="primary" @click="visible = true"> 上传笔记 </el-button>
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
          <el-tag
            hit
            size="small"
            :type="currentTab === item.id ? '' : 'info'"
            class="tag"
          >
            {{ item.amount }}
          </el-tag>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="article-list">
      <ArticleListCard />
    </div>
  </div>
  <DialogArticleUpload
    :dialog-visible="visible"
    @close="visible = false"
  ></DialogArticleUpload>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, watch } from "vue";
import { List as IconList } from "@element-plus/icons-vue";

let visible = ref(false);

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
  console.log("TODO 获取笔记列表");
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
.article-list {
  width: 100%;
}
</style>