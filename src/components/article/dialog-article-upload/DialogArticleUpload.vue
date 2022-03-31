<template>
  <el-dialog
    v-model="dialogVisible"
    :before-close="() => emit('close')"
    append-to-body
    destroy-on-close
    fullscreen
  >
    <template #title>
      <span class="title">
        <el-icon class="el-icon--upload"><IconUploadFilled /></el-icon>
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
            v-model="articleForm.title"
            class="input"
            maxlength="20"
            placeholder="请输入笔记标题"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="笔记分类" prop="atid">
          <el-select
            v-model="articleForm.atid"
            clearable
            filterable
            placeholder="请选择笔记分类"
          >
            <el-option
              v-for="item in articleTypeList"
              :key="item.atid"
              :label="item.label"
              :value="item.atid"
            />
          </el-select>
          <el-popover
            :width="200"
            placement="right"
            title="创建笔记分类"
            trigger="click"
          >
            <div class="add-type-popover">
              <el-input
                v-model="addTypeInput"
                class="add-type-input"
                placeholder="请输入新的分类"
              ></el-input>
              <div class="add-type-button">
                <el-button type="primary" @click="handleAddType"
                  >创建
                </el-button>
              </div>
            </div>
            <template #reference>
              <el-button type="text" class="add-type">创建分类</el-button>
            </template>
          </el-popover>
        </el-form-item>
        <el-form-item label="笔记简介" prop="desc">
          <el-input
            v-model="articleForm.desc"
            class="textarea"
            clearable
            maxlength="100"
            placeholder="请输入笔记简介"
            rows="3"
            show-word-limit
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="笔记内容" prop="content">
          <MdEditor
            v-model="articleForm.content"
            :onUploadImg="onUploadImg"
          ></MdEditor>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="() => emit('close')">取消</el-button>
        <el-button type="primary" @click="handleUpload">
          {{ dialogConfirmText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from "vue";
import { ElMessage } from "element-plus";
import Api from "@/networks/api";
import { baseUrl, Token } from "@/constants/common";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import axios from "axios";

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
    default: null,
  },
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
  title: [{ required: true, message: "请输入笔记标题", trigger: "blur" }],
  atid: [{ required: true, message: "请选择笔记分类", trigger: "blur" }],
  desc: [{ required: true, message: "请选择笔记简介", trigger: "blur" }],
  content: [{ required: true, message: "请输入笔记内容", trigger: "blur" }],
});

interface ArticleTypeItem {
  atid: string;
  label: string;
}

let articleTypeList: Ref<ArticleTypeItem[]> = ref([]);

getArticleTypeList();
initArticleForm();

async function onUploadImg(
  files: FileList,
  callback: (urls: string[]) => void
) {
  const res = await Promise.all(
    Array.from(files).map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("file", file);

        axios
          .post(`${baseUrl}/c/upload`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
              token: sessionStorage.getItem(Token) as string,
            },
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(
    res.map((item: any) => {
      return item.data.data.url;
    })
  );
}

async function getArticleTypeList() {
  try {
    articleTypeList.value = await Api.Article.getArticleTypeList();
  } catch (err) {
    ElMessage.error(err.message);
  }
}

async function handleAddType() {
  try {
    const data = await Api.Article.createArticleType({
      label: addTypeInput.value,
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
    return;
  }
  const { title, atid, desc, content } = articleForm.value;
  if (props.isEdit) {
    try {
      const data = await Api.Article.updateArticle({
        title,
        atid,
        desc,
        content,
        aid: props.articleInfo.aid,
        create_time: props.articleInfo.create_time,
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
        content,
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
  const { title, atid, desc, content } = props.articleInfo;
  articleForm.value = {
    title,
    atid,
    desc,
    content,
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
