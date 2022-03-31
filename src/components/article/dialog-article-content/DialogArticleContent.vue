<template>
  <el-dialog
    v-model="dialogVisible"
    title="笔记详情"
    append-to-body
    fullscreen
    @close="() => emit('close')"
    destroy-on-close
  >
    <div class="content-wrapper">
      <div class="title">{{ articleTitle }}</div>
      <div class="modify-time">{{ modifyTime }}</div>
      <div class="article-data">
        <div class="article-data--title">
          点赞量：<span class="data">{{ articleLike }}</span>
        </div>
        <div class="article-data--title">
          阅读量：<span class="data">{{ articleVv }}</span>
        </div>
      </div>
      <el-divider> 笔记简介 </el-divider>
      <div class="article-desc">{{ articleDesc }}</div>
      <el-divider> 笔记正文 </el-divider>
      <div class="article-content">
        <MdEditor v-model="articleContent" previewOnly></MdEditor>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";
// https://imzbf.github.io/md-editor-v3/demo/index
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const emit = defineEmits(["close"]);
const props = defineProps({
  dialogVisible: {
    required: true,
    type: Boolean,
  },
  articleInfo: {
    required: true,
    type: Object,
  },
});

const articleTitle = computed(() => props.articleInfo.title);
const modifyTime = computed(() =>
  dayjs(Number(props.articleInfo.modify_time)).format("YYYY年MM月DD日 HH:mm")
);
const articleLike = computed(() => props.articleInfo.article_like);
const articleVv = computed(() => props.articleInfo.article_vv);
const articleDesc = computed(() => props.articleInfo.desc);
const articleContent = computed(() => props.articleInfo.content);
</script>

<style scoped lang="scss">
.content-wrapper {
  .title {
    @include font-title();
    text-align: center;
  }
  .modify-time {
    @include font-second-title();
    text-align: center;
    margin: 8px 0;
  }
  .article-data {
    display: flex;
    justify-content: center;
    align-items: center;
    &--title {
      font-size: 14px;
      font-weight: lighter;
      width: 100px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .data {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .article-desc {
    font-size: 16px;
    font-weight: lighter;
  }
}
</style>