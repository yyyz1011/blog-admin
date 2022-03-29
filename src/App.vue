<template>
  <ElConfigProvider
      :size="elConfig.size"
      :z-index="elConfig.zIndex"
      :locale="elConfig.locale"
  >
    <div class="admin-layout">
      <el-container>
        <el-aside width="200px">
          <SideNav/>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {ElConfigProvider} from "element-plus";
import {ElConfig} from "@/typings/extraPlugin";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import Api from "@/networks/api";
import {Token} from "@/constants/common";

const elConfig: ElConfig = reactive({
  zIndex: 3000,
  size: "default",
  locale: zhCn,
});

getToken();

async function getToken() {
  try {
    const {token} = await Api.User.getToken();
    sessionStorage.setItem(Token, token);
  } catch (err) {

  }
}
</script>

<style scoped lang="scss">
.admin-layout {
  height: 100vh;

  .el-container {
    height: 100%;
  }

  .el-main {
    padding: 0;
  }
}
</style>