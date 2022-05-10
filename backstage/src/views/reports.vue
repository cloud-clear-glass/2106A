<template>
  <div class="reports">
    <div id="main" style="width: 80%; height: 70%" ref="mychart"></div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import * as echarts from "echarts";
import { getDataApi } from "../api/reportsHttp";
import _ from "lodash";
export default {
  setup() {
    const data = reactive({
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    });
    const mychart = ref("mychart");
    onMounted(async () => {
      let chartDom = document.getElementById("main");
      let myChart = echarts.init(chartDom);
      const result = await getDataApi();
      let option = _.merge(data.options, result);
      option && myChart.setOption(option);
      //   window.addEventListener("resize", ._value.style.width=70%mychart._value.resize);
      window.onresize = function () {
        // mychart._value.style.width = "80%";
        // mychart._value.style.height = "70%";
        myChart.resize();
      };
    });
    return {
      ...toRefs(data),
      mychart,
    };
  },
};
</script>
<style lang="scss" scoped>
.reports {
  height: 100%;
}
</style>
