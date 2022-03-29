<template>
  <div class="no-data">
    <img class="no-data--img" src="../../assets/img/no_data.svg">
    <div class="no-data--text">
      <slot>暂无内容</slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &--img {
    height: 200px;
  }

  &--text {
    font-size: 14px;
    font-weight: lighter;
    margin-top: 8px;
    letter-spacing: 4px;
  }
}
</style>