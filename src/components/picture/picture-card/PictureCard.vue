<template>
  <el-card class="picture-card" :style="cardStyle">
    <img class="picture-card--img" :src="pictureInfo.url" />
    <div class="picture-card--content">
      <div class="title">
        {{ pictureInfo.title }}
        <el-tag class="tag" :hit="true" type="info">{{
          dayjs(pictureInfo.modify_time).format("YYYY-MM-DD")
        }}</el-tag>
        <el-tag :hit="true" type="danger">{{ pictureInfo.region }}</el-tag>
      </div>
      <div class="desc">{{ pictureInfo.desc }}</div>
    </div>
    <div class="picture-card--operate">
      <div><el-button type="info">编辑</el-button></div>
      <div>
        <el-button type="danger" @click="handleDelPicture">删除</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";
const emit = defineEmits(["delete"]);
const props = defineProps({
  info: {
    required: true,
    type: Object,
  },
});

let pictureInfo = computed(() => props.info);
let cardStyle = computed(() => {
  const info = pictureInfo.value;
  return {
    backgroundImage: `url('${info.url}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    objectFit: "cover",
  };
});

function handleDelPicture() {
  emit("delete", pictureInfo.value.id);
}
</script>

<style scoped lang="scss">
.picture-card {
  margin-bottom: 8px;
  ::v-deep .el-card__body {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 50px;
    transition: all 0.3s ease;
    &:hover {
      height: 150px;
    }
  }
  &--img {
    height: 100%;
    border-radius: 16px 0 0 16px;
  }
  &--content {
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    flex: 1;
    border-radius: 0 16px 16px 0;
    overflow: hidden;
    .title {
      font-size: 18px;
      margin: 14px 0 8px 8px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .tag {
        margin: 0 8px;
      }
    }
    .desc {
      font-size: $font-size;
      margin-left: 8px;
      overflow: hidden;
    }
  }
  &--operate {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    div {
      margin: 4px 0;
    }
  }
}
</style>