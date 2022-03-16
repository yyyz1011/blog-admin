<template>
  <div class="header">
    <slot name="icon"></slot>
    <span class="title">
      <slot name="title"></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.header {
  @include font-title();
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 4px solid;
  border-image: linear-gradient(
      -30deg,
      $text-color-primary,
      $text-color-reverse
    )
    30 30;
  cursor: default;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .title {
    margin-left: 8px;
  }
}
</style>