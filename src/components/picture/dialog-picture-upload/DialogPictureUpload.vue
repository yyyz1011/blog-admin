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
            :limit="1"
            list-type="picture"
            :before-upload="handleBeforeUpload"
            :on-exceed="handleExceed"
            :file-list="fileList"
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
        <el-form-item label="拍摄时间" prop="create_time">
          <el-date-picker
            v-model="form.create_time"
            type="date"
            placeholder="选择拍摄时间"
            format="YYYY/MM/DD"
            value-format="x"
          />
        </el-form-item>
        <el-form-item label="图片介绍" prop="desc">
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
import { reactive, ref, computed, onMounted, Ref } from "vue";
import { ElMessage } from "element-plus";
import { UploadFilled as IconUploadFilled } from "@element-plus/icons-vue";
import { baseUrl, Token } from "@/constants/common";
import Api from "@/networks/api";
import dayjs from "dayjs";
import compressImg from "@/utils/compressImg";
import axios from "axios";

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
  isEdit: {
    type: Boolean,
    default: false,
  },
  pictureInfo: {
    type: Object,
    default: () => ({}),
  },
});

const uploadSetting = {
  uploadUrl: `${baseUrl}/c/upload`,
  headers: {
    token: sessionStorage.getItem(Token),
  },
};

const dialogVisible = computed(() => props.visible);
const dialogTitle = computed(() => props.title);
const dialogConfirmText = computed(() => props.confirmText);
const formPicture = ref();
const upload = ref();
let form = ref({
  title: "",
  picture_url: "",
  region: "",
  create_time: "",
  desc: "",
});
const rulesForm = reactive({
  title: [{ required: true, message: "图片名称不能为空", trigger: "blur" }],
  region: [{ required: true, message: "拍摄地区不能为空", trigger: "blur" }],
  create_time: [
    { required: true, message: "拍摄时间不能为空", trigger: "blur" },
  ],
  desc: [{ required: true, message: "简介不能为空", trigger: "blur" }],
});
let fileList: Ref<any> = ref([]);

function initPictureInfo() {
  const { isEdit, pictureInfo } = props;
  if (!isEdit) {
    console.log(1);
    form.value = {
      title: "",
      picture_url: "",
      region: "",
      create_time: "",
      desc: "",
    };
    return;
  }
  const {
    title,
    region,
    picture_url: pictureUrl,
    desc,
    create_time: createTime,
  } = pictureInfo;
  fileList.value = [{ url: pictureUrl }];
  form.value = {
    title,
    picture_url: pictureUrl,
    region,
    create_time: Number(createTime) as any,
    desc,
  };
}

onMounted(() => {
  initPictureInfo();
});

async function handleBeforeUpload(file: any) {
  const data = await compressImg(file);
  const formData = new FormData();
  formData.append("file", data.file);
  if (!sessionStorage.getItem(Token)) return false;
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
      token: sessionStorage.getItem(Token),
    },
  };
  try {
    const resData = await axios.post(`${baseUrl}/c/upload`, formData, config);
    form.value.picture_url = resData.data.data.url;
  } catch {
    ElMessage.error("上传出错，请检查~");
  } finally {
    return false;
  }
}
function handleExceed(files: any) {
  upload.value.clearFiles();
  upload.value.handleStart(files[0]);
}

function handleClose() {
  emit("close");
}
async function handleUpload() {
  if (!form.value.picture_url) {
    ElMessage.error("上传图片不能为空，请检查~");
    return;
  }
  try {
    await formPicture.value.validate();
  } catch {
    ElMessage.error("校验出错，请检查~");
    return;
  }
  try {
    const {
      title,
      region,
      desc,
      create_time: createTime,
      picture_url: pictureUrl,
    } = form.value;
    const params = {
      title,
      region,
      desc,
      create_time: createTime.toString(),
      picture_url: pictureUrl,
    };
    if (!props.isEdit) {
      const data = await Api.Picture.createPicture(params);
      ElMessage.success(`图片创建成功 pid:${data.pid}`);
    } else {
      const data = await Api.Picture.updatePicture({
        pid: props.pictureInfo.pid,
        ...params,
      });
      ElMessage.success(`图片更新成功 pid:${data.pid}`);
    }
    emit("success");
  } catch (err) {
    ElMessage.error(err.message);
  }
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