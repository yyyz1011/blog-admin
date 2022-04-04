<template>
  <HeaderNav>
    <template #icon>
      <el-icon><IconMessage /></el-icon>
    </template>
    <template #title> 留言板 </template>
  </HeaderNav>
  <div v-for="item in messageList" :key="item.mid" v-loading="loading">
    <el-card class="message-card">
      <template #header>
        <el-descriptions title="留言基本信息" direction="vertical">
          <el-descriptions-item label="账号">
            <span class="description-info">{{ item.account }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="用户名">
            <span class="description-info">{{ item.nick_name }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            <span class="description-info">
              {{ dayjs(Number(item.create_time)).format("YYYY-MM-DD HH:mm") }}
            </span>
          </el-descriptions-item>
          <template #extra>
            <el-button type="primary" @click="handleDelMessage(item.mid)"
              >删除</el-button
            >
          </template>
        </el-descriptions>
      </template>
      <MdEditor v-model="item.content" previewOnly></MdEditor>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { Message as IconMessage } from "@element-plus/icons-vue";
import Api from "@/networks/api";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const loading: Ref<boolean> = ref(true);
const messageList = ref<any>([]);

getMessageList();

async function getMessageList() {
  loading.value = true;
  try {
    const data = await Api.Message.getMessageList();
    messageList.value = data;
    console.log(data);
  } catch (err: any) {
    ElMessage.error(err.message);
  } finally {
    loading.value = false;
  }
}

async function handleDelMessage(mid: string) {
  try {
    await Api.Message.delMessage({ mid });
    getMessageList();
  } catch (err: any) {
    ElMessage.error(err.message);
  }
}
</script>
    

<style scoped lang="scss">
.message-card {
  margin: 16px;
}

.description-info {
  font-size: 16px;
  font-weight: bold;
}
</style>