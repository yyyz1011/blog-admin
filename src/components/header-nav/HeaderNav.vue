<template>
  <div class="header">
    <div class="header-left">
      <slot name="icon"></slot>
      <span class="title">
        <slot name="title"></slot>
      </span>
    </div>
    <div class="header-right">
      <slot name="operate"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  @include font-title();
  padding: 20px;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 4px solid;
  border-image: linear-gradient(
          -30deg,
          $text-color-primary,
          $text-color-reverse
  ) 30 30;
  cursor: default;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    margin-left: 8px;
  }

  .operate {
    float: right;
  }
}
</style>