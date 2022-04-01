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
          <el-carousel
            :autoplay="true"
            :interval="5000"
            arrow="never"
            :initial-index="currentCarousel"
            @change="handleCarouselChange"
            v-loading="loading"
          >
            <el-carousel-item
              v-for="index in allPage"
              :key="'todo-carousel-item' + index"
            >
              <div
                class="todo-list--item"
                v-for="(todoInfo, cIndex) in todoList.slice(
                  currentCarousel * 3,
                  currentCarousel * 3 + 3
                )"
                :key="todoInfo.id"
              >
                <div class="index">{{ currentCarousel * 3 + cIndex + 1 }}</div>
                <div>
                  <div>
                    截止日期：{{
                      dayjs(Number(todoInfo.end_time)).format("YYYY-MM-DD")
                    }}
                    <el-tag
                      class="timeout-tag"
                      v-if="isTimeout(todoInfo.end_time)"
                      type="danger"
                    >
                      超时
                    </el-tag>
                  </div>
                  <el-tooltip
                    effect="dark"
                    :content="todoInfo.content"
                    placement="top"
                  >
                    <div class="content">{{ todoInfo.content }}</div>
                  </el-tooltip>
                </div>
                <el-button
                  class="operate"
                  type="text"
                  @click="handleFinishTODO(todoInfo)"
                >
                  搞定
                </el-button>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </template>
  </CardPanel>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { reactive, Ref, ref } from "vue";
import { User as IconUser } from "@element-plus/icons-vue";
import { Notebook as IconNotebook } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

interface TodoListItem {
  id: string;
  content: string;
  end_time: string;
}
let loading: Ref<boolean> = ref(false);
let todoList: any = reactive([]);
let currentCarousel: Ref<number> = ref(0);
let allPage: Ref<number> = ref(0);

getTodoList();
getCarouselPage();

function isTimeout(time: string | number) {
  return Number(time) < new Date().getTime();
}

function getTodoList() {
  // TODO MOCK数据需要replace
  const MOCK_TodoList: Array<TodoListItem> = [
    {
      id: "1",
      content: "需要增加一个笔记分类统计接口",
      end_time: "16471927870776",
    },
    {
      id: "2",
      content: "准备留言板接口",
      end_time: "1647192787776",
    },
    {
      id: "3",
      content: "server日志打点",
      end_time: "1647192787776",
    },
    {
      id: "4",
      content: "增加TODO接口",
      end_time: "1647192787776",
    },
  ];
  todoList = MOCK_TodoList;
}

function getCarouselPage() {
  allPage.value = Math.ceil(todoList.length / 3);
}

function handleCarouselChange(payload: Event) {
  currentCarousel.value = payload as unknown as number;
}

function handleCreateTODO() {
  console.log("TODO 创建TODO");
  getTodoList();
  ElMessage({
    type: "info",
    message: "记得完成设置的TODO哈，敲脑阔",
    duration: 3000,
    grouping: true,
    center: true,
  });
}

function handleFinishTODO(todoInfo: TodoListItem) {
  loading.value = true;
  const delIndex = todoList.findIndex(
    (item: TodoListItem) => item.id === todoInfo.id
  );
  setTimeout(() => {
    // TODO 模拟删除todo接口
    todoList.splice(delIndex, 1);
    getCarouselPage();
    loading.value = false;
    ElMessage({
      type: "success",
      message: "恭喜恭喜，TODO-1",
      duration: 3000,
      grouping: true,
      center: true,
    });
  }, 1000);
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
::v-deep .el-carousel__container {
  height: 170px;
}
::v-deep .el-carousel__indicator {
  .el-carousel__button {
    background: $text-color-primary;
  }
}
</style>