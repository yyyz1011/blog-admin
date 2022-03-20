<template>
  <el-card class="article-list-card" @click="handleGoArticleDetail">
    <template #header>
      <div class="card-header">
        <div class="title">
          笔记的title
          <el-tag class="tag">Vue</el-tag>
        </div>
        <div class="operate">
          <el-button type="primary" @click.stop="handleEdit">编辑</el-button>
          <el-button @click.stop="handleDelete">删除</el-button>
        </div>
      </div>
    </template>
    <div class="card-content">
      <div class="card-content--summary"></div>
      <div class="card-content--desc">这是文章的简介</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
function handleGoArticleDetail() {
  console.log("TODO 跳转笔记详情页");
}
function handleEdit() {
  console.log("TODO 编辑");
}
function handleDelete() {
  console.log("TODO 删除编辑");
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
</style>