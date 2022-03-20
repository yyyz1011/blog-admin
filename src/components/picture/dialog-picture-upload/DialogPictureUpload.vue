<template>
  <el-dialog
    v-model="dialogVisible"
    destroy-on-close
    fullscreen
    :before-close="handleClose"
  >
    <template #title>
      <span class="title">
        <el-icon class="el-icon--upload"><IconUploadFilled /></el-icon>
        {{ dialogTitle }}
      </span>
    </template>
    <div class="upload-picture-wrapper">
      <img class="bg-img" src="../../../assets/img/upload_search.svg" />
      <el-form
        ref="formPicture"
        :model="form"
        :rules="rulesForm"
        label-width="120px"
      >
        <el-form-item label="图片名称" prop="title">
          <el-input
            class="input"
            v-model="form.title"
            placeholder="填写图片名称"
          />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            ref="upload"
            class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            list-type="picture"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
          >
            <el-icon class="el-icon--upload"><IconUploadFilled /></el-icon>
            <div class="el-upload__text">拖动图片或者<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="拍摄地区" prop="region">
          <el-input
            class="input"
            v-model="form.region"
            placeholder="填写拍摄城市"
          />
        </el-form-item>
        <el-form-item label="拍摄时间" prop="modifyTime">
          <el-date-picker
            v-model="form.modifyTime"
            type="date"
            placeholder="选择拍摄时间"
          />
        </el-form-item>
        <el-form-item label="图片介绍">
          <el-input
            v-model="form.desc"
            type="textarea"
            placeholder="填写图片介绍"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleUpload">
          {{ dialogConfirmText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { UploadFilled as IconUploadFilled } from "@element-plus/icons-vue";

const emit = defineEmits(["close", "success"]);
const props = defineProps({
  visible: {
    required: true,
    type: Boolean,
  },
  // props: 上传图片 / 编辑图片
  title: {
    type: String,
    default: "上传图片",
  },
  // props: 创建 / 编辑
  confirmText: {
    type: String,
    default: "创建",
  },
});

const dialogVisible = computed(() => props.visible);
const dialogTitle = computed(() => props.title);
const dialogConfirmText = computed(() => props.confirmText);
const formPicture = ref();
const upload = ref();
const form = reactive({
  title: "",
  uploadImg: "",
  region: "",
  modifyTime: "",
  desc: "",
});
const rulesForm = reactive({
  title: [{ required: true, message: "图片名称不能为空", trigger: "blur" }],
  region: [{ required: true, message: "拍摄地区不能为空", trigger: "blur" }],
  modifyTime: [
    { required: true, message: "拍摄时间不能为空", trigger: "blur" },
  ],
});

function handleExceed(files: any) {
  upload.value.clearFiles();
  upload.value.handleStart(files[0]);
}
function handleSuccess(files: any) {
  form.uploadImg = files;
}

function handleClose() {
  emit("close");
}
async function handleUpload() {
  if (!form.uploadImg) {
    ElMessage.error("上传图片不能为空，请检查~");
    return;
  }
  try {
    await formPicture.value.validate();
  } catch {
    ElMessage.error("校验出错，请检查~");
    return;
  }
  emit("success");
}
</script>

<style scoped lang="scss">
.title {
  @include font-title();
  display: flex;
  align-items: center;
}
.el-icon--upload {
  margin-right: 8px;
}
.upload-picture-wrapper {
  position: relative;
  .bg-img {
    position: fixed;
    right: 100px;
    top: 70px;
    height: 200px;
  }
}
.input {
  width: 300px;
}
</style>