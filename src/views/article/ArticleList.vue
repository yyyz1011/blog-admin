<template>
  <HeaderNav>
    <template #icon>
      <el-icon>
        <IconList />
      </el-icon>
    </template>
    <template #title> 笔记</template>
    <template #operate>
      <el-button type="primary" @click="visible = true">上传笔记</el-button>
    </template>
  </HeaderNav>
  <div class="article-wrapper">
    <el-tabs tab-position="left" class="tabs" v-model="currentTab">
      <el-tab-pane
        v-for="item in articleSummaryList"
        :key="item.atid"
        :name="item.atid"
      >
        <template #label>
          <span class="label">{{ item.label }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="article-list" v-loading="loading">
      <template v-if="articleList.length">
        <div
          v-for="item in articleList"
          :key="item.aid"
          class="article-list--card"
        >
          <ArticleListCard :info="item" @success="uploadArticleSuccess" />
        </div>
        <div class="article-bottom">已经到底啦</div>
      </template>
      <template v-else>
        <div class="no-data-wrapper">
          <NoData>笔记正在赶来的路上...</NoData>
        </div>
      </template>
    </div>
  </div>
  <DialogArticleUpload
    v-if="visible"
    :dialog-visible="visible"
    @close="visible = false"
    @success="uploadArticleSuccess"
  ></DialogArticleUpload>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, watch } from "vue";
import { List as IconList } from "@element-plus/icons-vue";
import Api from "@/networks/api";
import { ElMessage } from "element-plus";

let visible = ref(false);

let loading: Ref<boolean> = ref(false);
let loadingSummary: Ref<boolean> = ref(false);
let currentTab: Ref<string> = ref("0");

interface ArticleSummaryItem {
  atid: string;
  label: string;
  amount?: string;
}

let articleSummaryList: Ref<ArticleSummaryItem[]> = ref([]);

interface ArticleListItem {
  aid: string;
  article_like: number;
  article_vv: number;
  atLabel: string;
  atid: string;
  content: string;
  create_time: string;
  desc: string;
  modify_time: string;
  title: string;
}

let articleList: Ref<ArticleListItem[]> = ref([]);

async function getArticleSummary() {
  loadingSummary.value = true;
  try {
    const data = await Api.Article.getArticleTypeList();
    articleSummaryList.value = [
      {
        atid: "0",
        label: "全部",
        amount: 40,
      },
      ...data.map((item) => ({
        ...item,
        amount: 10,
      })),
    ];
  } catch (err) {
    ElMessage.error(err.message);
  } finally {
    loadingSummary.value = false;
  }
}

async function getArticleList(id?: string) {
  loading.value = true;
  let params = {};
  const articleTypeId = id ?? currentTab.value;
  if (articleTypeId !== "0") {
    params.atid = articleTypeId;
  }
  try {
    articleList.value = await Api.Article.getArticleList(params);
  } catch (err) {
    ElMessage.error(err.message);
  } finally {
    loading.value = false;
  }
}

async function uploadArticleSuccess() {
  await getArticleSummary();
  await getArticleList();
  visible.value = false;
}

watch(currentTab, (val) => {
  getArticleList(val);
});

onMounted(async () => {
  await getArticleSummary();
  await getArticleList();
});
</script>


<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: $background-white;
}

.article-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.tabs {
  position: sticky;
  top: 80px;
  z-index: 10;
  height: 100%;
  width: 100px;

  .tag {
    margin-left: 4px;
    width: 50px;
  }
}

.article-list {
  margin: 0 16px;
  width: 100%;

  &--card {
    margin-bottom: 16px;
    transition: all 0.4s ease;

    &:hover {
      transform: translateY(-7px);
    }
  }
}

.article-bottom {
  text-align: center;
  margin: 10px 0 20px;
  font-size: 16px;
  font-weight: lighter;
}

.no-data-wrapper {
  margin-top: 40px;
}
</style>