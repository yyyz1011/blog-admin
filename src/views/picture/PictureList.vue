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
  <div v-if="pictureList.length > 0" v-loading="loading">
    <template v-for="item in pictureList" :key="item.id">
      <PictureCard
        :info="item"
        @success="getPictureList"
        @delete="handleDelPicture"
      ></PictureCard>
    </template>
  </div>
  <DialogPictureUpload
    :visible="dialogUploadVisible"
    @close="dialogUploadVisible = false"
    @success="uploadSuccess"
  />
</template>

<script setup lang="ts">
import { Ref, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { PictureFilled as IconPictureFilled } from "@element-plus/icons-vue";
import Api from "@/networks/api";

let loading: Ref<boolean> = ref(false);
let dialogUploadVisible: Ref<boolean> = ref(false);

interface PictureListItem {
  pid: string;
  title: string;
  region: string;
  picture_url: string;
  desc: string;
  create_time: string;
}
let pictureList: Ref<PictureListItem[]> = ref([]);
async function getPictureList() {
  loading.value = true;
  try {
    const data = await Api.Picture.getPictureList();
    pictureList.value = data;
  } catch (err) {
    ElMessage.error(err.message);
  } finally {
    loading.value = false;
  }
}
function uploadSuccess() {
  dialogUploadVisible.value = false;
  getPictureList();
}
async function handleDelPicture(pid: string) {
  try {
    const data = await Api.Picture.delPicture({ pid });
    ElMessage.success(`删除图片成功 pid:${data.pid}`);
    getPictureList();
  } catch (err) {
    ElMessage.error(err.message);
  }
}

onMounted(() => {
  getPictureList();
});
</script>
    