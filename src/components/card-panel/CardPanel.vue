<template>
  <el-card class="card-panel" shadow="hover">
    <template #header>
      <div class="card-panel--title">
        <slot name="title"></slot>
        <div class="operate">
          <slot name="operate"></slot>
        </div>
      </div>
      <div class="card-panel--second-title">
        <slot name="second-title"></slot>
      </div>
    </template>
    <div class="card-panel--content">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.card-panel {
  width: 500px;
  &--title {
    @include font-title();
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: default;
    user-select: none;
    position: relative;
    height: 20px;
    .operate {
      position: absolute;
      right: 4px;
    }
  }
  &--second-title {
    font-size: $font-size;
    font-weight: lighter;
    margin-top: 4px;
    cursor: default;
    user-select: none;
  }
}
</style>