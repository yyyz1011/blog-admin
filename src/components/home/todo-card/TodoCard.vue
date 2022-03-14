<template>
  <CardPanel class="todo-card">
    <template #title>
      <el-icon><IconNotebook /></el-icon>
      <span class="title-text">TODO</span>
    </template>
    <template #operate>
      <el-button type="text" @click="handleCreateTODO">创建TODO</el-button>
    </template>
    <template #second-title>若你决定灿烂，山无遮，海无拦。</template>
    <template #content>
      <div class="todo-content">
        <div class="todo-list">
          <div
            class="todo-list--item"
            v-for="(item, index) in todoList"
            :key="'todo-list-item' + index"
          >
            <div class="index">{{ index + 1 }}</div>
            <div>
              <div>
                截止日期：{{ dayjs(item.end_time).format("YYYY-MM-DD") }}
              </div>
              <el-tooltip effect="dark" :content="item.content" placement="top">
                <div class="content">{{ item.content }}</div>
              </el-tooltip>
            </div>
            <el-button class="operate" type="text" @click="handleFinishTODO"
              >完成</el-button
            >
          </div>
        </div>
      </div>
    </template>
  </CardPanel>
</template>

<script setup lang="ts">
import { reactive, Ref, ref } from "vue";
import dayjs from "dayjs";
import { User as IconUser } from "@element-plus/icons-vue";
import { Notebook as IconNotebook } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

interface TodoListItem {
  id: string;
  content: string;
  end_time: string;
}
const todoList: Array<TodoListItem> = reactive([
  {
    id: "1",
    content: "完成TODO部分的内容",
    end_time: "1647192787776",
  },
  {
    id: "1",
    content: "ElMessage消息通知有问题，看一下electron",
    end_time: "1647192787776",
  },
  {
    id: "1",
    content: "完成TODO部分的内容",
    end_time: "1647192787776",
  },
]);

function handleCreateTODO() {
  console.log("TODO 创建TODO");
}

function handleFinishTODO() {
  console.log("TODO 完成TODO");
}
</script>

<style lang="scss" scoped>
.todo-card {
  flex: 1;
  margin-left: 8px;
}
.title-text {
  margin-left: 4px;
}
.todo-content {
  .todo-list {
    height: 110px;
    &--item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 15px;
      font-weight: lighter;
      padding: 4px 0;
      .index {
        font-size: 28px;
        margin-right: 8px;
      }
      .content {
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>