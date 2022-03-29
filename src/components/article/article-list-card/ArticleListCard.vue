<template>
  <el-card class="article-list-card" @click="handleGoArticleDetail">
    <template #header>
      <div class="card-header">
        <div class="title">
          {{ articleInfo.title }}
          <el-tag class="tag">{{ articleInfo.atLabel }}</el-tag>
        </div>
        <div class="operate">
          <el-button type="primary" @click.stop="visible = true">编辑</el-button>
          <el-button @click.stop="handleDelete">删除</el-button>
        </div>
      </div>
    </template>
    <div class="card-content">
      <div class="card-content--desc">
        {{ articleInfo.desc }}
      </div>
      <div class="card-content--summary">
        <div>
          <span class="like">点赞量:{{ articleInfo.article_like }}</span>
          <span class="vv">阅读量:{{ articleInfo.article_vv }}</span>
        </div>
        <div class="modify-time">修改时间:{{ dayjs(Number(articleInfo.modify_time)).format("YYYY-MM-DD HH:mm") }}</div>
      </div>
    </div>
  </el-card>
  <!--编辑笔记-->
  <DialogArticleUpload
      v-if="visible"
      :is-edit="true"
      :dialog-visible="visible"
      dialog-title="编辑笔记"
      dialog-confirm-text="编辑"
      :article-info="articleInfo"
      @close="visible = false"
      @success="uploadArticleSuccess"
  ></DialogArticleUpload>
</template>

<script setup lang="ts">
import {computed, Ref, ref} from "vue";
import dayjs from "dayjs";
import Api from "@/networks/api";
import {ElMessage} from "element-plus";

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(["success"]);

let visible: Ref<boolean> = ref(false);

const articleInfo = computed(() => props.info);

function handleGoArticleDetail() {
  console.log("TODO 跳转笔记详情页");
}

function uploadArticleSuccess() {
  visible.value = false;
  emit("success");
}

async function handleDelete() {
  try {
    const data = await Api.Article.delArticle({
      aid: props.info.aid
    });
    emit("success");
    ElMessage.success(`删除成功 aid:${data.aid}`);
  } catch (err) {
    ElMessage.error(err.message);
  }
}
</script>

<style scoped lang="scss">
.article-list-card {
  cursor: pointer;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    @include font-second-title();
    display: flex;
    align-items: center;

    .tag {
      margin-left: 8px;
    }
  }
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    .card-content--summary {
      opacity: 1;
    }
  }

  &--summary {
    font-size: 16px;
    opacity: 0.4;
    transition: all 0.3s ease;
    width: 250px;

    .like {
      display: inline-block;
      margin-right: 8px;
      width: 100px;
    }

    .vv {
      display: inline-block;
      margin-right: 8px;
      width: 100px;
    }
  }
}
</style>