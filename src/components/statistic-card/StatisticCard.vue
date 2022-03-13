<template>
  <div class="statistic-card">
    <div class="title">
      {{ title }}
    </div>
    <div class="amount">
      {{ formatAmount }}
      <slot name="amountAppend"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { formatPrice } from "leaf-util/index";
const props = defineProps(["title", "amount"]);
const formatAmount = formatPrice(props.amount);
</script>

<style scoped lang="scss">
.statistic-card {
  padding: 8px 0;
  cursor: default;
  user-select: none;
}
.title {
  font-size: 14px;
  font-weight: lighter;
  color: $text-color-grey;
}
.amount {
  font-size: 20px;
  font-weight: lighter;
  color: $text-color-primary;
  margin-top: 4px;
}
</style>