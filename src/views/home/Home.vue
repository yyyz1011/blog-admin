<template>
  <div class="home-header">
    <SummaryCard></SummaryCard>
    <TodoCard></TodoCard>
  </div>
  <div class="home-bottom">
    <GithubCard></GithubCard>
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
  height: 280px;
}
</style>