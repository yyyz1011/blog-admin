<template>
  <div class="home-header">
    <SummaryCard></SummaryCard>
    <TodoCard></TodoCard>
  </div>
  <div class="home-bottom">
    <ArticleCard></ArticleCard>
    <ToolCard></ToolCard>
  </div>
</template>

<style scoped lang="scss">
.home-header {
  display: flex;
  justify-content: space-between;
  height: 270px;
}
.home-bottom {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  height: 250px;
}
</style>