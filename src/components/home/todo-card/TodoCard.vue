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
          >
            <el-carousel-item
              v-for="index in allPage"
              :key="'todo-carousel-item' + index"
            >
              <div
                class="todo-list--item"
                v-for="(todoInfo, index) in todoList[currentCarousel]"
                :key="todoInfo.id"
              >
                <div class="index">{{ currentCarousel * 3 + index + 1 }}</div>
                <div>
                  <div>
                    截止日期：{{
                      dayjs(todoInfo.end_time).format("YYYY-MM-DD")
                    }}
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
                  @click="handleFinishTODO"
                >
                  完成
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
let todoList: any = reactive([]);
let currentCarousel: Ref<number> = ref(0);
let allPage: Ref<number> = ref(0);

getTodoList();

function getTodoList() {
  // TODO MOCK数据需要replace
  const MOCK_TodoList: Array<TodoListItem> = [
    {
      id: "1",
      content: "创建TODO需要一个dialog",
      end_time: "1647192787776",
    },
    {
      id: "1123",
      content: "home-article部分",
      end_time: "1647192787776",
    },
    {
      id: "1123123",
      content: "home-tool部分",
      end_time: "1647192787776",
    },
    {
      id: "112111111111113",
      content: "需要设计一下toolcard里工具的样式嘿嘿嘿",
      end_time: "1647192787776",
    },
    {
      id: "1121111111111131",
      content: "electron新开页面有问题",
      end_time: "1647192787776",
    },
    {
      id: "112831",
      content: "sidenav增加密码记录哭",
      end_time: "1647192787776",
    },
  ];
  for (let i = 0; i < MOCK_TodoList.length; i += 3) {
    todoList.push(MOCK_TodoList.slice(i, i + 3));
  }
  allPage.value = Math.ceil(MOCK_TodoList.length / 3);
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

function handleFinishTODO() {
  console.log("TODO 完成TODO");
  getTodoList();
  ElMessage({
    type: "success",
    message: "恭喜恭喜，TODO-1",
    duration: 3000,
    grouping: true,
    center: true,
  });
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