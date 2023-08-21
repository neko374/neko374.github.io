<template>
  <div>
    <Header></Header>
    <div id="chart1"></div>
  </div>
</template>
  
  <script>
import { inject, onMounted } from "vue";
import Header from "../../components/header/header.vue";
export default {
  name: "chart",
  setup() {
    onMounted(() => {
      // 图表
      let myChart = inject("echarts").init(document.getElementById("chart1"));
      myChart.setOption({
        title: { text: "总用户量" },
        tooltip: {},
        xAxis: {
          data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
        },
        yAxis: {},
        series: [
          {
            name: "用户量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
      window.onresize = function () {
        myChart.resize();
      };
    });
  },
  components: { Header },
};
</script>
  
  <style lang="scss" scoped>
#chart1 {
  width: 600px;
  height: 300px;
}
</style>