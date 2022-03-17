<template>
  <ToolItem title="时间戳转化">
    <template #dialogContent>
      <div class="date-content">
        <div class="date-type">
          <span class="date-type--title">时间戳单位:</span>
          <el-radio-group v-model="dateType" size="large">
            <el-radio-button
              v-for="item in dateTypeList"
              :key="'dateType' + item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="date-format">
          <span class="date-format--title">时间戳格式:</span>
          <el-input class="date-format--input" v-model="dateFormat"></el-input>
        </div>
        <div class="date-change">
          <span class="change-title">时间戳:</span>
          <el-input class="change-input" v-model="timestamp2Time"></el-input>
          <el-button
            class="change-operate"
            type="primary"
            @click="handleTimestamp2Time"
          >
            转化>>
          </el-button>
          <span class="change-result">{{ timestamp2TimeResult }}</span>
        </div>
        <div class="date-change">
          <span class="change-title">时间:</span>
          <el-input class="change-input" v-model="time2Timestamp"></el-input>
          <el-button
            class="change-operate"
            type="primary"
            @click="handleTime2Timestamp"
          >
            转化>>
          </el-button>
          <span class="change-result">{{ time2TimestampResult }}</span>
        </div>
      </div>
    </template>
  </ToolItem>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import dayjs from "dayjs";

const Second: string = "second";
const MilliSecond: string = "millisecond";
interface DateTypeItem {
  label: string;
  value: string;
}

let dateType: Ref<string> = ref(MilliSecond);
const dateTypeList: DateTypeItem[] = [
  { label: "秒", value: Second },
  { label: "毫秒", value: MilliSecond },
];

let dateFormat: Ref<string> = ref("YYYY-MM-DD HH:mm:ss");

let timestamp2Time: Ref<string | number> = ref(new Date().getTime());
let timestamp2TimeResult: Ref<string> = ref("无");
function handleTimestamp2Time() {
  timestamp2TimeResult.value =
    dateType.value === Second
      ? dayjs
          .unix(parseInt(timestamp2Time.value as string))
          .format(dateFormat.value)
      : dayjs(parseInt(timestamp2Time.value as string)).format(
          dateFormat.value
        );
}

let time2Timestamp: Ref<string | number> = ref(
  dayjs().format(dateFormat.value)
);
let time2TimestampResult: Ref<string | number> = ref("无");
function handleTime2Timestamp() {
  time2TimestampResult.value =
    dateType.value === Second
      ? parseInt((new Date(time2Timestamp.value).getTime() / 1000).toString())
      : new Date(time2Timestamp.value).getTime();
}

watch(dateType, (val) => {
  const time =
    val === Second ? new Date().getTime() / 1000 : new Date().getTime();
  timestamp2Time.value = parseInt(time.toString());
});
</script>

<style scoped lang="scss">
.date-content {
  font-size: 15px;
}
.date-type {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  &--title {
    width: 75px;
    margin-right: 8px;
  }
}
.date-format {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  &--title {
    width: 75px;
    margin-right: 8px;
  }
  &--input {
    width: 400px;
  }
}
.date-change {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;
  .change-title {
    width: 75px;
    margin-right: 8px;
  }
  .change-input {
    width: 250px;
  }
  .change-operate {
    margin: 0 8px;
  }
}
</style>