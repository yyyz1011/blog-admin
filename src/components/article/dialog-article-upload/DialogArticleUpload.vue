<template>
  <el-dialog
      v-model="dialogVisible"
      destroy-on-close
      fullscreen
      :before-close="handleClose"
      append-to-body
  >
    <template #title>
      <span class="title">
        <el-icon class="el-icon--upload"><IconUploadFilled/></el-icon>
        {{ dialogTitle }}
      </span>
    </template>
    <div class="article-wrapper">
      <el-form
          ref="formRef"
          :model="articleForm"
          :rules="fromRules"
          label-width="120px"
      >
        <el-form-item label="笔记标题" prop="title">
          <el-input
              class="input"
              placeholder="请输入笔记标题"
              v-model="articleForm.title"
              show-word-limit
              maxlength="20"
          />
        </el-form-item>
        <el-form-item label="笔记分类" prop="atid">
          <el-select
              v-model="articleForm.atid"
              placeholder="请选择笔记分类"
              filterable
              clearable
          >
            <el-option
                v-for="item in articleTypeList"
                :key="item.atid"
                :label="item.label"
                :value="item.atid"
            />
          </el-select>
          <el-popover
              placement="right"
              title="创建笔记分类"
              :width="200"
              trigger="click"
          >
            <div class="add-type-popover">
              <el-input
                  class="add-type-input"
                  v-model="addTypeInput"
                  placeholder="请输入新的分类"
              ></el-input>
              <div class="add-type-button">
                <el-button type="primary" @click="handleAddType"
                >创建
                </el-button
                >
              </div>
            </div>
            <template #reference>
              <el-button type="text" class="add-type">创建分类</el-button>
            </template>
          </el-popover>
        </el-form-item>
        <el-form-item label="笔记简介" prop="desc">
          <el-input
              class="textarea"
              placeholder="请输入笔记简介"
              v-model="articleForm.desc"
              type="textarea"
              rows="3"
              clearable
              show-word-limit
              maxlength="100"
          />
        </el-form-item>
        <el-form-item label="笔记内容" prop="content">
          <Vue3Tinymce
              v-model="articleForm.content"
              :setting="editorSetting"
              @change="handleChangeEditorContent"
          ></Vue3Tinymce>
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
import {ref, reactive, Ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {UploadFilled as IconUploadFilled} from "@element-plus/icons-vue";
import Api from "@/networks/api";
// @ts-ignore
import Vue3Tinymce from "@jsdawn/vue3-tinymce";

const emit = defineEmits(["close", "success"]);
const props = defineProps({
  dialogVisible: {
    required: true,
    type: Boolean,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: "上传笔记",
  },
  dialogConfirmText: {
    type: String,
    default: "上传",
  },
  articleInfo: {
    type: [Object, null],
    default: null
  }
});

let formRef = ref(null);
let articleForm = ref({
  title: "",
  atid: [],
  desc: "",
  content: "",
});
let addTypeInput = ref("");
let fromRules = reactive({
  title: [{required: true, message: "请输入笔记标题", trigger: "blur"}],
  atid: [{required: true, message: "请选择笔记分类", trigger: "blur"}],
  desc: [{required: true, message: "请选择笔记简介", trigger: "blur"}],
  content: [{required: true, message: "请输入笔记内容", trigger: "blur"}],
});

interface ArticleTypeItem {
  atid: string;
  label: string;
  amount?: string;
}

let articleTypeList: Ref<ArticleTypeItem[]> = ref([]);

// https://www.tiny.cloud/docs/
let editorSetting = reactive({
  // 工具栏
  menubar: false,
  width: 900,
  height: 400,
  toolbar:
      "bold italic underline h1 h2 h3 h4 blockquote codesample numlist bullist link image",
  plugins: "codesample link image lists",
  toolbar_mode: "sliding",
  nonbreaking_force_tab: true,
  link_title: false,
  default_link_target: "_blank",
  content_style: "body{font-size: 16px}",
  // 自定义 图片上传模式
  custom_images_upload: true,
  images_upload_url: "https://jsonplaceholder.typicode.com/posts/",
  custom_images_upload_callback: (res: any) => res.url,
  custom_images_upload_param: {id: "xxxx01", age: 18},
  language: "zh_CN",
  language_url:
      "https://unpkg.com/@jsdawn/vue3-tinymce@1.1.6/dist/tinymce/langs/zh_CN.js",
});

getArticleTypeList();
initArticleForm();

async function getArticleTypeList() {
  try {
    articleTypeList.value = await Api.Article.getArticleTypeList();
  } catch (err) {
    ElMessage.error(err.message);
  }
}

function handleChangeEditorContent(val: any) {
  // console.log(val);
}

function handleClose() {
  emit("close");
}

async function handleAddType() {
  try {
    const data = await Api.Article.createArticleType({
      label: addTypeInput.value
    });
    ElMessage.success(`创建成功 atid:${data.atid}`);
    await getArticleTypeList();
  } catch (err) {
    ElMessage.error(err.message);
  }
}

async function handleUpload() {
  if (!formRef.value) return;
  try {
    await (formRef.value as any).validate();
  } catch {
    ElMessage.error("校验失败");
  }
  const {title, atid, desc, content} = articleForm.value;
  if (props.isEdit) {
    try {
      const data = await Api.Article.updateArticle({
        title,
        atid,
        desc,
        content,
        aid: props.articleInfo.aid,
        create_time: props.articleInfo.create_time
      });
      ElMessage.success(`编辑成功 aid:${data.aid}`);
      emit("success");
    } catch (err) {
      ElMessage.error(err.message);
    }
  } else {
    try {
      const data = await Api.Article.createArticle({
        title,
        atid,
        desc,
        content
      });
      ElMessage.success(`创建成功 aid:${data.aid}`);
      emit("success");
    } catch (err) {
      ElMessage.error(err.message);
    }
  }
}

function initArticleForm() {
  if (!props.isEdit) return;
  const {title, atid, desc, content} = props.articleInfo;
  articleForm.value = {
    title, atid, desc, content
  };
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

.article-wrapper {
  .input {
    width: 300px;
  }

  .textarea {
    width: 900px;
  }

  .add-type {
    margin-left: 8px;
  }
}
</style>

<style lang="scss">
.add-type-popover {
  .add-type-button {
    display: flex;
    align-content: center;
    justify-content: flex-end;
    margin-top: 8px;
  }
}

.tox-tinymce-aux {
  position: absolute !important;
  z-index: 99999 !important;
}

.tox-statusbar__branding {
  display: none;
}
</style>