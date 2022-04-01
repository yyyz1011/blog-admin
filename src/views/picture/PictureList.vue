<template>
  <HeaderNav>
    <template #icon>
      <el-icon><IconPictureFilled /></el-icon>
    </template>
    <template #title> 图库 </template>
    <template #operate>
      <el-button type="primary" @click="dialogUploadVisible = true">
        上传图片
      </el-button>
    </template>
  </HeaderNav>
  <div v-if="pictureList.length > 0">
    <template v-for="item in pictureList" :key="item.id">
      <PictureCard :info="item" @delete="handleDelPicture"></PictureCard>
    </template>
  </div>
  <DialogPictureUpload
    :visible="dialogUploadVisible"
    @close="dialogUploadVisible = false"
  />
</template>

<script setup lang="ts">
import { Ref, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { PictureFilled as IconPictureFilled } from "@element-plus/icons-vue";

let dialogUploadVisible: Ref<boolean> = ref(false);

interface PictureListItem {
  id: string;
  title: string;
  region: string;
  url: string;
  desc: string;
  modify_time: string;
}
let pictureList: Ref<PictureListItem[]> = ref([]);
function getPictureList() {}
function handleDelPicture(id: string) {
  ElMessage.success("删除成功");
  console.log("删除图片，id是", id);
}

onMounted(() => {
  getPictureList();
});
</script>
    