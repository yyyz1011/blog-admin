<template>
  <el-card class="picture-card">
    <img class="picture-card--img" :src="pictureInfo.picture_url" />
    <div class="picture-card--content">
      <div class="title">
        {{ pictureInfo.title }}
        <el-tag class="tag" :hit="true" type="info">{{
          dayjs(Number(pictureInfo.create_time)).format("YYYY-MM-DD")
        }}</el-tag>
        <el-tag :hit="true" type="danger">{{ pictureInfo.region }}</el-tag>
      </div>
      <div class="desc">{{ pictureInfo.desc }}</div>
    </div>
    <div class="picture-card--operate">
      <div>
        <el-button type="info" @click="dialogUploadVisible = true">
          编辑
        </el-button>
      </div>
      <div>
        <el-button type="danger" @click="handleDelPicture">删除</el-button>
      </div>
    </div>
  </el-card>
  <DialogPictureUpload
    :visible="dialogUploadVisible"
    title="编辑图片"
    confirm-text="完成编辑"
    :is-edit="true"
    :picture-info="pictureInfo"
    @close="dialogUploadVisible = false"
    @success="updateSuccess"
  />
</template>

<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import dayjs from "dayjs";
const emit = defineEmits(["delete", "success"]);
const props = defineProps({
  info: {
    required: true,
    type: Object,
  },
});

let dialogUploadVisible: Ref<boolean> = ref(false);
let pictureInfo = computed(() => props.info);

function updateSuccess() {
  dialogUploadVisible.value = false;
  emit("success");
}
function handleDelPicture() {
  emit("delete", pictureInfo.value.pid);
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
      .desc {
        opacity: 1;
      }
    }
  }
  &--img {
    height: 100%;
    border-radius: 16px 0 0 16px;
  }
  &--content {
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    flex: 1;
    border-radius: 0 16px 16px 0;
    overflow: hidden;
    .title {
      @include font-second-title();
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
      transition: all 0.3s ease;
      opacity: 0;
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