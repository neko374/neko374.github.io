<template>
  <router-view></router-view>
</template>
<script>
import * as echarts from "echarts";
import { provide } from "vue";

export default {
  name: "App",
  setup() {
    provide("echarts", echarts);
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>