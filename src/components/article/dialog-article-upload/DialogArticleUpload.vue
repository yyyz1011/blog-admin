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
    <div class="article-wrapper">
      <div>hello</div>
      <div ref="editorRef">123</div>
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
import { ref, onMounted, watch, computed } from "vue";
import { UploadFilled as IconUploadFilled } from "@element-plus/icons-vue";

const emit = defineEmits(["close", "success"]);
const props = defineProps({
  dialogVisible: {
    required: true,
    type: Boolean,
  },
  dialogTitle: {
    type: String,
    default: "上传笔记",
  },
  dialogConfirmText: {
    type: String,
    default: "上传",
  },
});
const visible = computed(() => props.dialogVisible);

let editorRef: Ref<HTMLDivElement | null> = ref(null);
let editor: Ref<EngineInterface | null> = ref(null);
let articleForm = ref({
  content: "hello",
});

watch(visible, () => {
  setTimeout(() => {
    initEditor();
  });
});

function initEditor() {
}

function handleClose() {
  emit("close");
}

function handleUpload() {
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
</style>